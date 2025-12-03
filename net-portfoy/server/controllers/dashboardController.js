const Portfolio = require('../models/Portfolio');
const Customer = require('../models/Customer');

const getDateFilters = () => {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  
  return { startOfThisMonth, startOfLastMonth, endOfLastMonth };
};

const calculateTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// @desc    
// @route   GET /api/dashboard
const getDashboardStats = async (req, res) => {
  const userId = req.user.id;
  const { startOfThisMonth, startOfLastMonth, endOfLastMonth } = getDateFilters();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); 

  try {
    const portfolios = await Portfolio.find({ user: userId });
    
    const valueThisMonth = portfolios
      .filter(p => p.createdAt >= startOfThisMonth && p.currency === 'TL')
      .reduce((acc, p) => acc + p.price, 0);

    const valueLastMonth = portfolios
      .filter(p => p.createdAt >= startOfLastMonth && p.createdAt <= endOfLastMonth && p.currency === 'TL')
      .reduce((acc, p) => acc + p.price, 0);
      
    const valueTrend = calculateTrend(valueThisMonth, valueLastMonth);

    const activePortfolios = portfolios.filter(p => p.status === 'active').length;
    const newPortfoliosThisMonth = portfolios.filter(p => p.createdAt >= startOfThisMonth).length;
    const newPortfoliosLastMonth = portfolios.filter(p => p.createdAt >= startOfLastMonth && p.createdAt <= endOfLastMonth).length;
    const portfolioTrend = newPortfoliosThisMonth - newPortfoliosLastMonth; // Sayısal fark (+2, -1 gibi)

    const soldThisMonth = portfolios.filter(p => p.status === 'sold' && p.updatedAt >= startOfThisMonth).length;
    const soldLastMonth = portfolios.filter(p => p.status === 'sold' && p.updatedAt >= startOfLastMonth && p.updatedAt <= endOfLastMonth).length;
    const salesTrend = soldThisMonth - soldLastMonth; // Sayısal fark

    const totalValue = portfolios.reduce((acc, item) => {
      if (item.status === 'active' && item.currency === 'TL') return acc + item.price;
      return acc;
    }, 0);

    const customers = await Customer.find({ user: userId }).sort({ updatedAt: -1 });

    const totalCustomers = customers.length;
    const pendingAppointments = customers.filter(c => c.status === 'appointment').length;
    const callListCount = customers.filter(c => c.status === 'to_call').length;

    const customersThisMonth = customers.filter(c => c.createdAt >= startOfThisMonth).length;
    const customersLastMonth = customers.filter(c => c.createdAt >= startOfLastMonth && c.createdAt <= endOfLastMonth).length;
    const customerTrend = customersThisMonth - customersLastMonth; 

   const completedStatuses = ['follow_up', 'offer_made', 'processed', 'sold'];

   const taskCustomers = await Customer.find({ 
        user: userId, 
        $or: [
          { status: { $in: ['to_call', 'appointment'] },
            nextActionDate: { $lte: endOfDay }
          },
          { 
            status: { $in: completedStatuses },
            updatedAt: { $gte: startOfDay, $lte: endOfDay }
          }
        ]
    }).select('name status nextActionDate');

    const taskPortfolios = await Portfolio.find({ 
        user: userId, 
        $or: [
          { 
            status: 'deed_sale',
            nextActionDate: { $lte: endOfDay } 
          },
          { 
            status: 'sold',
            updatedAt: { $gte: startOfDay, $lte: endOfDay } 
          }
        ]
    }).select('title status nextActionDate price');

    const customerTasks = taskCustomers.map(c => ({
        id: c._id,
        title: c.name,
        subtitle: c.status === 'to_call' ? 'Arama Yapılacak' : 'İşlem Geçmişi',
        type: c.status,
        model: 'customer',
        time: completedStatuses.includes(c.status) ? c.updatedAt : c.nextActionDate,
        isCompleted: completedStatuses.includes(c.status) 
    }));

    const portfolioTasks = taskPortfolios.map(p => ({
        id: p._id,
        title: p.title,
        subtitle: `Tapu Satış - ${p.price} TL`,
        type: p.status,
        model: 'portfolio',
        time: completedStatuses.includes(p.status) ? p.updatedAt : p.nextActionDate,
        isCompleted: completedStatuses.includes(p.status)
    }));

    const agendaItems = [...customerTasks, ...portfolioTasks]
        .sort((a, b) => {
            if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1;
            }
            return new Date(a.time) - new Date(b.time)
        });

    res.status(200).json({
      kpi: {
        totalValue,
        activePortfolios,
        totalCustomers,
        soldThisMonth,
        pendingAppointments,
        callListCount,
        trends: {
          value: valueTrend,       
          portfolio: portfolioTrend, 
          customer: customerTrend,   
          sales: salesTrend         
        }
      },
      agenda: agendaItems
    });

  } catch (error) {
    res.status(500).json({ message: 'İstatistikler alınamadı', error: error.message });
  }
};

const completeAgendaItem = async (req, res) => {
  const { id } = req.params;
  const { model, type } = req.body;

  try {
    let updatedItem;
    if (model === 'customer') {
      let newStatus = 'processed';

      if (type === 'to_call') {
        newStatus = 'follow_up'; 
      } else if (type === 'appointment') {
        newStatus = 'offer_made';
      }

      updatedItem = await Customer.findByIdAndUpdate(
        id, 
        { status: newStatus },
        { new: true }
      );
    } 
    else if (model === 'portfolio') {
      if (type === 'deed_sale') {
        updatedItem = await Portfolio.findByIdAndUpdate(
          id,
          { status: 'sold' }, 
          { new: true }
        );
      }
    } 
    else {
      return res.status(400).json({ message: 'Geçersiz veri kaynağı (model)' });
    }

    if (!updatedItem) {
      return res.status(404).json({ message: 'Kayıt bulunamadı' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Görev tamamlandı, statü güncellendi.',
      newStatus: updatedItem.status 
    });

  } catch (error) {
    res.status(500).json({ message: 'Güncelleme yapılamadı', error: error.message });
  }
};

module.exports = { getDashboardStats, completeAgendaItem };