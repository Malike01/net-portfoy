export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  status: 'Satılık' | 'Kiralık' | 'pasif';
  imageUrl: string;
  date: string;
  matchedClient?: string; 
}