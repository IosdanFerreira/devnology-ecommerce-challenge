import type { IProduct } from "./product.interface";
export interface orderedProduct {
  product: IProduct
  quantity: number
}
export interface Order {
  id: number;
  customer: string;
  email: string;
  phone: string;
  address: string;
  products: orderedProduct[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  paymentMethod: string;
  paymentStatus: string;
  paymentId?: string;
  paymentDate?: string;
  userId?: number;
}