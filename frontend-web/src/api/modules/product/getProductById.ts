import type { IApiResponse } from "@/api/interface/api-response.interface";
import { api } from "@/api/lib/axios";
import type { IProduct } from "@/interfaces/product.interface";

export async function getProductById(id: string): Promise<IApiResponse<IProduct>> {
  

  const { data } = await api.get<IApiResponse<IProduct>>(`/products/${id}`);

  return data;
};