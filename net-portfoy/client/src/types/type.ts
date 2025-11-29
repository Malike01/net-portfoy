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