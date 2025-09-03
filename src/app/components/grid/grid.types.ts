export interface GridItem {
  id: number;
  [key: string]: any;
}

export interface GridSortChangeEvent {
  sortKey: string;
  sortDirection: SortDirection;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationChangeEvent {
  currentPage: number;
  pageSize: number | null;
}
