export const AGENDA_STATUSES = {
    TO_CALL: 'to_call',
    OFFER_MADE: 'offer_made',
    APPOINTMENT: 'appointment',
    NEW: 'new',
} as const;

export const AGENDA_CONFIG = {
    [AGENDA_STATUSES.TO_CALL]: { color: 'blue', text: 'Aranacak', bg: '#eff6ff' },
    [AGENDA_STATUSES.OFFER_MADE]: { color: 'orange', text: 'Teklif Bekleniyor', bg: '#fff7ed' },
    [AGENDA_STATUSES.APPOINTMENT]: { color: 'purple', text: 'Randevu', bg: '#f3e8ff' },
    [AGENDA_STATUSES.NEW]: { color: 'green', text: 'Yeni Kayıt', bg: '#f6ffed' },
    DEFAULT: { color: 'default', text: 'Takip Et', bg: '#f5f5f5' },
};

export const STAT_CARD_CONFIG = {
    TOTAL_VALUE: { color: '#1890ff', title: 'Portföy Değeri' },
    ACTIVE_PORTFOLIO: { color: '#722ed1', title: 'Aktif Portföy' },
    TOTAL_CUSTOMERS: { color: '#fa8c16', title: 'Toplam Müşteri' },
    SOLD_THIS_MONTH: { color: '#52c41a', title: 'Bu Ay Satılan' },
};

export const TREND_COLORS = {
    UP_BG: '#f6ffed',
    UP_TEXT: '#52c41a',
    DOWN_BG: '#fff1f0',
    DOWN_TEXT: '#cf1322',
};
