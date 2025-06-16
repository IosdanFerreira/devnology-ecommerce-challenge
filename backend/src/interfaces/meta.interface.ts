import { PaginationInterface } from './pagination.interface';

export type SortDirection = 'asc' | 'desc';

export interface MetaInterface<Filter = string> {
  pagination: PaginationInterface;
  sort: string | null;
  sortDir: SortDirection;
  filter: Filter | null;
}
