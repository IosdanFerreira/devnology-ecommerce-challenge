import type { IApiPagination } from "./api-pagination.interface";

export interface IApiMeta {
    paginations: IApiPagination,
    sort: string | null,
    sortDir: string | null,
    filter: string | null
}