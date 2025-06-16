import { PaginationInterface } from './pagination.interface';

export interface GeneratePaginationResponseInterface<T> {
  data: T[];
  pagination: PaginationInterface;
}
