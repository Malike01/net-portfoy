const User = require('../models/User');

const FEATURES_CONFIG = {
  'ai_valuation': { name: 'Yapay Zeka Değerleme', trialDays: 3 },
  'advanced_reports': { name: 'Gelişmiş Raporlar', trialDays: 3 }
};

// @desc    
// @route   POST /api/features/start-trial
const startTrial = async (req, res) => {
  const { featureKey } = req.body;
  const user = await User.findById(req.user.id);

  const existing = user.features.find(f => f.featureKey === featureKey);
  if (existing) {
    return res.status(400).json({ message: 'Bu özellik zaten tanımlı veya kullanılmış.' });
  }

  user.features.push({
    featureKey,
    status: 'trial',
    trialStartDate: new Date()
  });

  await user.save();
  
  res.json({ 
    message: '3 Günlük deneme süreniz başladı!', 
    features: user.features 
  });
};

// @desc    
// @route   POST /api/features/purchase
const purchaseFeature = async (req, res) => {
  const { featureKey } = req.body;
  const user = await User.findById(req.user.id);

  const featureIndex = user.features.findIndex(f => f.featureKey === featureKey);

  if (featureIndex > -1) {
    user.features[featureIndex].status = 'active';
    user.features[featureIndex].purchaseDate = new Date();
  } else {
    user.features.push({
      featureKey,
      status: 'active',
      purchaseDate: new Date()
    });
  }

  await user.save();
  res.json({ message: 'Özellik başarıyla satın alındı!', features: user.features });
};

module.exports = { startTrial, purchaseFeature };