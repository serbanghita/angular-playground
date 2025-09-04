export interface GridItem {
  id: number;
  [key: string]: any;
}

export interface GridSortChangeEvent {
  columnName: string;
  direction: SortDirection;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationChangeEvent {
  currentPage: number;
  pageSize: number | null;
}
