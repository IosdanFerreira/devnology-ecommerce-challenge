import type { IApiErrors } from "./api-errors.interface";
import type { IApiMeta } from "./api-meta.interface";


export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  errorType: string | null;
  errors: IApiErrors[] | null;
  message: string;
  data: T | null;
  meta: IApiMeta | null;
}