export interface ProductT {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number | sizeStock;
  image: string;
  fit?: string[];
  features: string[];
  collection?: string | undefined;
}
interface sizeStock {
  [size: string]: number;
}
export type Products = ProductT[];
