export interface IQueryParams {
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: string;
    filter?: string;
    hasDiscount?: string | boolean;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    supplier?: string;
    material?: string;
}