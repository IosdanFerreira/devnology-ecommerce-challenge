import type { IApiResponse } from "@/api/interface/api-response.interface";
import type { IQueryParams } from "@/api/interface/query-params";
import { api } from "@/api/lib/axios";
import type { IProduct } from "@/interfaces/product.interface";

export async function getAllProducts(params: IQueryParams): Promise<IApiResponse<IProduct[]>> {
  const { page = 1, perPage = 10, sort="createdAt", sortDir="desc", filter, hasDiscount } = params;

  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("perPage", perPage.toString());
  if (sort) queryParams.set("sort", sort);
  if (sortDir) queryParams.set("sortDir", sortDir);
  if (filter) queryParams.set("filter", filter);
  if (hasDiscount) queryParams.set("hasDiscount", hasDiscount.toString());

  const { data } = await api.get<IApiResponse<IProduct[]>>(`/products?${queryParams.toString()}`);
  return data;
};