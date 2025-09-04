// grid.component.ts

import { ChangeDetectionStrategy, Component, computed, contentChildren, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, isObservable, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';
import { GridHeaderComponent } from './header/grid-header.component';
import { GridItem, GridSortChangeEvent, PaginationChangeEvent, SortDirection } from './grid.types';
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
  data = input<GridItem[] | Observable<GridItem[]>>();
  sortable = input(true);
  total = input<number>();
  // The @input is now the single source of truth for page size.
  pageSize = input<number | null>(10);

  columns = contentChildren(GridColumnComponent);

  sortChange = output<GridSortChangeEvent>();
  paginationChange = output<PaginationChangeEvent>();

  sortKey = signal<string>('id');
  sortDirection = signal<SortDirection>(SortDirection.ASC);
  // The grid component can safely manage its own current page.
  currentPage = signal<number>(1);

  private dataAsArray = computed(() =>
    Array.isArray(this.data()) ? (this.data() as GridItem[]) : []
  );

  totalItems = computed(() => this.total() ?? this.dataAsArray().length);

  data$ = combineLatest([
    toObservable(this.data),
    toObservable(this.currentPage),
    toObservable(this.pageSize)
  ]).pipe(
    switchMap(([dataValue, page, size]) => {
      const dataObs = isObservable(dataValue) ? dataValue : of(dataValue);
      return dataObs.pipe(
        map(items => {
          if (Array.isArray(items) && size !== null) {
            const start = (page - 1) * size;
            const end = start + size;
            return items.slice(start, end);
          }
          return items;
        })
      );
    })
  );

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
