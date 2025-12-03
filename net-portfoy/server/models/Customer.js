const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Lütfen müşteri adını giriniz'],
    },
    customerType: {
      type: String,
      enum: ['buyer', 'seller'],
      required: [true, 'Müşteri tipi zorunludur'],
      default: 'buyer'
    },
    phone: {
      type: String,
      required: [true, 'Lütfen telefon numarası giriniz'],
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'new',            // Yeni
        'to_call',        // Aranacak
        'unreachable',    // Ulaşılamadı
        'follow_up',      // Takipte
        'appointment',    // Randevu
        'offer_made',     // Teklif Verildi
        'deposit_taken',  // Kapora Alındı
        'completed',      // Tamamlandı
        'postponed',      // Ertelendi
        'cancelled'       // İptal
      ],
      default: 'new',
    },
    portfolioId: {
      type: [String], 
      default: null
    },
    portfolioTitle: {
      type: String,
      default: ''
    },
    nextActionDate: {
      type: Date,
      default: Date.now 
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', customerSchema);