export interface PortfolioItem {
  _id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  status: 'Satılık' | 'Kiralık' | 'pasif';
  imageUrl: string;
  date: string;
  matchedCustomers?: string;
  externalLinks?: {
    sahibinden?: string;
    hepsiemlak?: string;
    emlakjet?: string;
  }
}

export interface CustomerItem {
  _id: string;
  name: string;
  phone: string;
  email: string;
  status: 'Aktif' | 'Pasif' | 'Aranacak' | 'Teklif Verildi' | 'Tapu/Satış' | 'Kapora' | 'Randevu Alındı';
  portfolioId?: number;
  portfolioTitle?: string;
  customerType?: 'buyer' | 'seller';
  date: Date;
}

export interface DashboardData {
  kpi: {
    totalValue: number;
    activePortfolios: number;
    totalCustomers: number;
    soldThisMonth: number;
    pendingAppointments: number;
    callListCount: number;
    trends?: {
      value: number;
      portfolio: number;
      customer: number;
      sales: number;
    };
  };
  agenda: {
    id: string;
    title: string;
    type: string;
    time: string;
    isCompleted: boolean;
  }[];
}
export interface DbNotification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  isRead: boolean;
  createdAt: string;
  relatedId?: string;
}
