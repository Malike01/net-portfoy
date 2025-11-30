export const RECENT_NOTIFICATIONS = [
    { id: 1, title: 'Yeni Müşteri Kaydı', desc: 'Ahmet Yılmaz sisteme eklendi.', time: '5 dk önce' },
    { id: 2, title: 'Portföy Güncellemesi', desc: 'Sahil Evi fiyatı değişti.', time: '1 sa önce' },
];

export const MENU_KEYS = {
    DASHBOARD: {
        path: '/',
        title: 'Genel Bakış',
    },
    PORTFOLIOS:{
        path: '/portfolios',
        title: 'Portföyler',
    },
    CUSTOMERS: {
        path: '/customers',
        title: 'Müşteriler',
    },
};

export const USER_MENU_KEYS = {
    SETTINGS:{
        key: '1',
        title: 'Hesap Ayarları',
    },
    LOGOUT: {
        key: '2',
        title: 'Çıkış Yap',
    }
};
