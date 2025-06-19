export interface IQueryParams {
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: string;
    filter?: string;
    hasDiscount?: string | boolean;
}