import { Component, signal, effect, inject, computed } from '@angular/core';
import { ProgressComponent } from './components/progress/progress.component';
import { GridComponent } from './components/grid/grid.component';
import { GridColumnComponent } from './components/grid/column/grid-column.component';
import { GridData, PaginationChangeEvent, GridSortChangeEvent, SortDirection } from './components/grid/grid.types';
import { Item, ItemService, PaginatedResponse } from './services/item.service';

@Component({
  selector: 'app-root',
  imports: [ProgressComponent, GridComponent, GridColumnComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private itemService = inject(ItemService);

  requestState = signal({
    pagination: { currentPage: 1, pageSize: 5 } as PaginationChangeEvent,
    sort: {
      columnName: 'id',
      direction: SortDirection.ASC,
    } as GridSortChangeEvent,
  });

  apiResponse = signal<PaginatedResponse<Item>>({
    data: [],
    pagination: { currentPage: 1, total: 0, pageSize: 5 },
  });

  loading = signal<boolean>(false);

  gridData = computed<GridData<Item> | null>(() => {
    const res = this.apiResponse();
    if (!res) return null;
    return {
      items: res.data,
      total: res.pagination.total,
    };
  });

  constructor() {
    this.fetchData();
    effect(() => {
      this.requestState();
      this.fetchData();
    });
  }

  async fetchData(): Promise<void> {
    this.loading.set(true);
    const state = this.requestState();
    const response = await this.itemService.fetchItems(
      state.pagination.currentPage,
      state.pagination.pageSize,
      state.sort
    );
    this.apiResponse.set(response);
    this.loading.set(false);
  }

  onPaginationChange(event: PaginationChangeEvent): void {
    this.requestState.update(current => ({ ...current, pagination: event }));
  }

  onSortChange(event: GridSortChangeEvent): void {
    this.requestState.update(current => ({
      sort: event,
      pagination: { ...current.pagination, currentPage: 1 },
    }));
  }
}
