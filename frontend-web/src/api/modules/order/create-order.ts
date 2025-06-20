import { api } from "@/api/lib/axios";
import type { CartItem } from "@/store/cart-store";

export interface CreateOrderDTO {
  customer: string;
  email: string;
  phone: string;
  address: string;
  products: CartItem[]; 
  totalAmount: number;
  paymentMethod: "creditCard" | "boleto" | "pix";
  paymentId?: string;
}

export async function createOrder(data: CreateOrderDTO) {
  const response = await api.post("/order", data);
  return response.data;
}