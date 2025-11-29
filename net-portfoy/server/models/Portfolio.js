const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Lütfen ilan başlığı giriniz'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Lütfen fiyat bilgisi giriniz'],
      default: 0
    },
    currency: {
      type: String,
      enum: ['TL', 'USD', 'EUR', 'GBP'],
      default: 'TL',
    },
    
    portfolioType: {
      type: String,
      enum: ['for_sale', 'for_rent', 'daily_rent', 'transfer'], 
      default: 'for_sale',
      required: true
    },

    status: {
      type: String,
      enum: [
        'active',   
        'offer',   
        'deposit',  
        'sold',     
        'rented',   
        'passive'   
      ],
      default: 'active',
    },

    externalLinks: {
      sahibinden: { type: String, default: '' },
      hepsiemlak: { type: String, default: '' },
      emlakjet: { type: String, default: '' },
      website: { type: String, default: '' } 
    },

    imageUrl: {
      type: String, 
    },

    matchedCustomers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);