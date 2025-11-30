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

    const agendaStatuses = ['to_call', 'offer_made', 'follow_up', 'appointment', 'new'];
    const agendaItems = customers
      .filter(c => agendaStatuses.includes(c.status))
      .slice(0, 5)
      .map(c => ({
        id: c._id,
        title: c.name,
        type: c.status,
        time: c.updatedAt,
        isCompleted: false
      }));

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

module.exports = { getDashboardStats };