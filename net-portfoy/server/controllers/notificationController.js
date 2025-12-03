const Notification = require('../models/Notification');
const Customer = require('../models/Customer');
const Portfolio = require('../models/Portfolio'); 

// @desc  
// @route   GET /api/notifications
const getNotifications = async (req, res) => {
  const userId = req.user._id; 

  const existingWelcome = await Notification.findOne({
    user: userId,
    category: 'welcome'
  });

  if (!existingWelcome) {
    await Notification.create({
      user: userId,
      title: `Aramıza Hoş Geldin, ${req.user.name.split(' ')[0]}! 👋`,
      message: 'CRM sistemine başarıyla giriş yaptın. İlk müşterini veya portföyünü ekleyerek işe başlayabilirsin.',
      type: 'success',
      category: 'welcome',
      relatedId: '/dashboard'
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const callCount = await Customer.countDocuments({ 
    user: userId, 
    status: 'to_call',
    nextActionDate: { $lte: endOfDay }
  });

  const appointmentCount = await Customer.countDocuments({ 
    user: userId, 
    status: 'appointment',
    nextActionDate: { $lte: endOfDay }
  });

  const deedCount = await Portfolio.countDocuments({ 
    user: userId, 
    status: 'deed_sale',
    nextActionDate: { $lte: endOfDay }
  });

  const totalTasks = callCount + appointmentCount + deedCount;

  let detailString = '';
  let details = [];
  if (callCount > 0) details.push(`${callCount} arama`);
  if (appointmentCount > 0) details.push(`${appointmentCount} randevu`);
  if (deedCount > 0) details.push(`${deedCount} tapu işlemi`);
  detailString = details.join(', ');

  const notificationMessage = `Bugün ilgilenmeniz gereken ${detailString} sistemde sizi bekliyor.`;

  if (totalTasks > 0) {
    const existingReminder = await Notification.findOne({
      user: userId,
      category: 'daily_summary', 
      createdAt: { $gte: startOfDay }
    });

    if (existingReminder) {
      if (existingReminder.message !== notificationMessage) {
        existingReminder.message = notificationMessage;
        existingReminder.title = `Güncel İş Planı (${totalTasks} Görev) 📅`; // Başlığı da güncelleyelim
        existingReminder.isRead = false; // <--- TEKRAR OKUNMADI YAP (Bildirim ışığı yansın)
        existingReminder.updatedAt = new Date(); // Sıralamada yukarı çıksın
        await existingReminder.save();
      }
    } else {
      await Notification.create({
        user: userId,
        title: 'Günlük İş Planınız Hazır 📅',
        message: notificationMessage,
        type: 'warning',
        category: 'daily_summary',
        relatedId: '/dashboard' 
      });
    }
  }

  const notifications = await Notification.find({ user: userId })
    .sort({ isRead: 1, createdAt: -1 }); 

  res.status(200).json(notifications);
};

// @desc  
// @route   PUT /api/notifications/:id/read
const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification && notification.user.toString() === req.user._id.toString()) {
    notification.isRead = true;
    await notification.save();
    res.status(200).json(notification);
  } else {
    res.status(404);
    throw new Error('Bildirim bulunamadı');
  }
};

// @desc   
// @route   POST /api/notifications/system
const createSystemNotification = async (req, res) => {
    const { title, message, userId } = req.body;
    
    const notification = await Notification.create({
        user: userId, 
        title,
        message,
        type: 'system',
        category: 'system_update'
    });
    
    res.status(201).json(notification);
}

module.exports = { getNotifications, markAsRead, createSystemNotification };