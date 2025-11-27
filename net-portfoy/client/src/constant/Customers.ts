// ==========================================
// SECTION 1: CUSTOMER TYPES
// Who is this customer? (Buyer, Seller, etc.)
// ==========================================

export const CUSTOMER_TYPES = {
  BUYER: 'buyer',
  SELLER: 'seller',
} as const;

// Option list for Ant Design Select component
export const CUSTOMER_TYPE_OPTIONS = [
  { label: 'Alıcı', value: CUSTOMER_TYPES.BUYER, color: 'blue' },
  { label: 'Satıcı', value: CUSTOMER_TYPES.SELLER, color: 'gold' },
];

// ==========================================
// SECTION 2: CUSTOMER STATUSES (PIPELINE)
// What stage is the process in?
// ==========================================

export const CUSTOMER_STATUSES = {
  NEW: 'new',
  TO_CALL: 'to_call',
  UNREACHABLE: 'unreachable',
  FOLLOW_UP: 'follow_up',
  APPOINTMENT: 'appointment',
  OFFER_MADE: 'offer_made',
  DEPOSIT_TAKEN: 'deposit_taken',
  COMPLETED: 'completed',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
} as const;

// Option list for Ant Design Select component
// Ordered logically by sales funnel stages
export const CUSTOMER_STATUS_OPTIONS = [
  // -- Stage 1: Entry --
  { label: 'Yeni Kayıt', value: CUSTOMER_STATUSES.NEW, color: 'default' },
  { label: 'Aranacak', value: CUSTOMER_STATUSES.TO_CALL, color: 'warning' },

  // -- Stage 2: Communication --
  { label: 'Ulaşılamadı', value: CUSTOMER_STATUSES.UNREACHABLE, color: 'magenta' },
  { label: 'Takipte / İletişimde', value: CUSTOMER_STATUSES.FOLLOW_UP, color: 'cyan' },

  // -- Stage 3: Action / Hot Leads --
  { label: 'Randevu / Yer Gösterme', value: CUSTOMER_STATUSES.APPOINTMENT, color: 'geekblue' },
  { label: 'Teklif Aşamasında', value: CUSTOMER_STATUSES.OFFER_MADE, color: 'purple' },
  { label: 'Kapora Alındı', value: CUSTOMER_STATUSES.DEPOSIT_TAKEN, color: 'lime' },

  // -- Stage 4: Conclusion (Won) --
  { label: 'Tapu/Satış', value: CUSTOMER_STATUSES.COMPLETED, color: 'success' },

  // -- Stage 5: On Hold / Lost --
  { label: 'Ertelendi', value: CUSTOMER_STATUSES.POSTPONED, color: 'orange' },
  { label: 'Olumsuz / İptal', value: CUSTOMER_STATUSES.CANCELLED, color: 'red' },
];
