export const CURRENCY_OPTIONS = [
  { label: 'TL', value: 'TL' },
  { label: 'USD', value: 'USD' }
];

// ==========================================
// SECTION 1: PORTFOLIO TYPES
// Defines the category of the property (Sale, Rent, etc.)
// These values are immutable (unlikely to change).
// ==========================================

export const PORTFOLIO_TYPES = {
  FOR_SALE: 'for_sale',
  FOR_RENT: 'for_rent',
  DAILY: 'daily_rent',
  TRANSFER: 'transfer', 
} as const;

export const PORTFOLIO_TYPE_OPTIONS = [
  { label: 'Satılık', value: PORTFOLIO_TYPES.FOR_SALE, color: 'blue' },
  { label: 'Kiralık', value: PORTFOLIO_TYPES.FOR_RENT, color: 'cyan' },
  { label: 'Günlük', value: PORTFOLIO_TYPES.DAILY, color: 'geekblue' },
  { label: 'Devren', value: PORTFOLIO_TYPES.TRANSFER, color: 'purple' },
];

// ==========================================
// SECTION 2: PORTFOLIO STATUSES
// Represents the current lifecycle stage of the listing.
// ==========================================

export const PORTFOLIO_STATUSES = {
  ACTIVE: 'active',           // Currently listed and available
  OFFER_PROCESS: 'offer',     // Negotiation in progress
  DEPOSIT_TAKEN: 'deposit',   // Reserved / Optioned
  SOLD: 'sold',               // Deal closed (Sale)
  RENTED: 'rented',           // Deal closed (Rent)
  PASSIVE: 'passive',         // Removed from listing / Inactive
} as const;

export const PORTFOLIO_STATUS_OPTIONS = [
  // -- Active Stages --
  { label: 'Yayında / Aktif', value: PORTFOLIO_STATUSES.ACTIVE, color: 'success' }, // Green: Available
  { label: 'Teklif Aşamasında', value: PORTFOLIO_STATUSES.OFFER_PROCESS, color: 'processing' }, // Blue: Active negotiation
  { label: 'Kapora / Opsiyonlu', value: PORTFOLIO_STATUSES.DEPOSIT_TAKEN, color: 'warning' }, // Orange: Reserved

  // -- Completed Stages --
  { label: 'Satıldı', value: PORTFOLIO_STATUSES.SOLD, color: 'red' }, // Red: No longer available
  { label: 'Kiralandı', value: PORTFOLIO_STATUSES.RENTED, color: 'red' },

  // -- Inactive Stages --
  { label: 'Pasif / İptal', value: PORTFOLIO_STATUSES.PASSIVE, color: 'default' },
];