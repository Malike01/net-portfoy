const Notification = require('../models/Notification');
const Customer = require('../models/Customer');

// @desc    
// @route   GET /api/notifications
const getNotifications = async (req, res) => {
  const userId = req.user.id;

  //----Welcome Notification----
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

  //----Feature Launch Notification----
    const existingFeature = await Notification.findOne({
    user: userId,
    category: 'feature_launch'
  });

    if (!existingFeature) {
      await Notification.create({
        "title": "Yeni Özellik: Yapay Zeka Değerleme! 🤖",
        "message": "Artık portföylerinizin fiyatını yapay zeka ile tahmin edebilirsiniz. 3 gün ücretsiz denemek için tıklayın.",
        "type": "info",
        "category": "feature_launch",
        "relatedId": "/ai-valuation" 
      });
  }

   //----Call Reminder Notification----
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const existingReminder = await Notification.findOne({
    user: userId,
    category: 'call_reminder',
    createdAt: { $gte: startOfDay }
  });

  if (!existingReminder) {
    const callCount = await Customer.countDocuments({ 
      user: userId, 
      status: 'to_call' 
    });

    if (callCount > 0) {
      await Notification.create({
        user: userId,
        title: 'Hatırlatma: Aramalarınız Var',
        message: `Bugün aramanız gereken ${callCount} adet müşteri listenizde bekliyor.`,
        type: 'warning',
        category: 'call_reminder',
        relatedId: '/customers' 
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

  if (notification && notification.user.toString() === req.user.id) {
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