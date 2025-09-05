import { ChangeDetectionStrategy, Component, computed, contentChildren, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { GridHeaderComponent } from './header/grid-header.component';
import { GridData, GridItem, GridSortChangeEvent, PaginationChangeEvent, SortDirection } from './grid.types';
import { GridColumnComponent } from './column/grid-column.component';
import { GridPaginationComponent } from './pagination/grid-pagination.component';

@Component({
  selector: 't-grid',
  imports: [CommonModule, GridHeaderComponent, GridPaginationComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  data = input<GridData<GridItem> | null>();
  sortable = input(true);
  pageSize = input<number | null>(10);

  columns = contentChildren(GridColumnComponent);

  sortChange = output<GridSortChangeEvent>();
  paginationChange = output<PaginationChangeEvent>();

  sortKey = signal<string>('id');
  sortDirection = signal<SortDirection>(SortDirection.ASC);
  currentPage = signal<number>(1);

  items = computed(() => this.data()?.items ?? []);
  totalItems = computed(() => this.data()?.total ?? 0);

  data$ = toObservable(this.items);

  onSort(key: string): void {
    if (this.sortKey() === key) {
      this.sortDirection.update(dir => dir === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      this.sortKey.set(key);
      this.sortDirection.set(SortDirection.ASC);
    }

    this.sortChange.emit({
      columnName: this.sortKey(),
      direction: this.sortDirection(),
    });
  }

  onPaginationChange(event: PaginationChangeEvent): void {
    this.currentPage.set(event.currentPage);
    this.paginationChange.emit(event);
  }
}
