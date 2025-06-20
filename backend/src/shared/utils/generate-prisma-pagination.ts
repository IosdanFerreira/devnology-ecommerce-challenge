import { PaginationInterface } from './interfaces/pagination.interface';

export class PrismaPagination {
  /**
   * Generate pagination metadata
   * @param totalItems Total number of items in the collection
   * @param page Current page number
   * @param limit Number of items per page
   * @returns Pagination metadata
   */
  static generate(
    totalItems: number,
    page: number,
    limit: number,
  ): PaginationInterface {
    const totalPages = Math.ceil(totalItems / limit);

    const prevPage = page > 1 ? page - 1 : null;

    const nextPage = page < totalPages ? page + 1 : null;

    return {
      totalItems,
      perPage: limit,
      currentPage: page,
      prevPage: prevPage,
      nextPage: nextPage,
      totalPages: totalPages,
    };
  }
}
