export interface IApiPagination {
    totalItems: number;
    perPage: number;
    currentPage: number;
    prevPage: number | null;
    nextPage: number | null;
    totalPages: number;
}