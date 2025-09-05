import { Injectable } from '@angular/core';
import { SortDirection } from '../components/grid/grid.types';

export interface Item {
  id: number;
  name: string;
  color: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    total: number;
    pageSize: number | null;
  };
}

// Simulate we have a server where we request
// the items based on pagination (from GridComponent).
// (delay involved, to see the loading state)
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private fullDataSet: Item[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    color: ['red', 'blue', 'green', 'orange', 'violet', 'purple', 'teal'][i % 7],
  }));

  async fetchItems(
    currentPage: number,
    pageSize: number | null,
    sortConfig?: { columnName: string; direction: SortDirection }
  ): Promise<PaginatedResponse<Item>> {
    return new Promise(resolve => {
      setTimeout(() => {
        let dataToSort = [...this.fullDataSet];

        if (sortConfig && sortConfig.columnName) {
          dataToSort.sort((a, b) => {
            const valA = a[sortConfig.columnName as keyof Item];
            const valB = b[sortConfig.columnName as keyof Item];

            let comparison = 0;
            if (valA > valB) {
              comparison = 1;
            } else if (valA < valB) {
              comparison = -1;
            }

            return sortConfig.direction === SortDirection.DESC
              ? comparison * -1
              : comparison;
          });
        }

        if (pageSize === null) {
          resolve({
            data: dataToSort,
            pagination: { currentPage: 1, total: dataToSort.length, pageSize: null },
          });
          return;
        }

        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = dataToSort.slice(start, end);

        resolve({
          data: paginatedData,
          pagination: {
            currentPage,
            total: this.fullDataSet.length,
            pageSize,
          },
        });
      }, 1000);
    });
  }
}
