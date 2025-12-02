export const REGEX = {
    PHONE: /^05\d{9}$/,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    SAHIBINDEN: /sahibinden\.com/,
    HEPSIEMLAK: /hepsiemlak\.com/, // Simplified check based on usage
    EMLAKJET: /emlakjet\.com/, // Simplified check based on usage
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const IMAGE_UPLOAD_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

export const CURRENCY_CONFIG = {
    LOCALE: 'tr-TR',
    CURRENCY: 'TRY',
};

export const TOUR_STEPS_DATA = [
  {
    title: 'Hoş Geldiniz! 👋',
    description: 'NetPortfoy CRM sistemine hoş geldiniz. Sizi kısaca gezdirelim.',
    target: null, 
  },
  {
    title: 'Genel Bakış',
    description: 'Portföy değerinizi, aktif ilanlarınızı ve müşteri istatistiklerinizi buradan takip edebilirsiniz.',
    target: '.tour-dashboard-kpi',
  },
  {
    title: 'Günlük Ajanda',
    description: 'Aramalarınız ve randevularınız burada listelenir. İşlemi tamamlayınca işaretlemeyi unutmayın.',
    target: '.tour-agenda',
  },
  {
    title: 'Portföy Yönetimi',
    description: 'İlanlarınızı eklemek, düzenlemek ve linklerini yönetmek için bu menüyü kullanın.',
    target: '.tour-menu-portfolios',
  },
  {
    title: 'Müşteri İlişkileri',
    description: 'Alıcı ve satıcı veritabanınızı buradan yönetin.',
    target: '.tour-menu-customers',
  },
  {
    title: 'Bildirim Merkezi',
    description: 'Sistem uyarıları ve hatırlatmalar buraya düşer.',
    target: '.tour-notification-bell',
  },
];
