export interface Review {
  id: string;
  productId: string;
  name: string;
  email: string;
  date: Date | string;
  rating: number;
  title: string;
  comment: string;
}
export interface ReviewsByCategory {
  [category: string]: Review[];
}
