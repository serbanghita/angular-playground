import {ChangeDetectionStrategy, Component, contentChildren, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {isObservable, Observable, of, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {GridHeaderComponent} from './grid-header.component';
import {GridItem, GridSortChangeEvent, SortDirection} from './grid.types';
import {ColumnComponent} from './column.component';

@Component({
  selector: 't-grid',
  imports: [CommonModule, GridHeaderComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  data = input<GridItem[] | Observable<GridItem[]>>();
  sortable = input(true);
  // Columns.
  columns = contentChildren(ColumnComponent);

  data$ = toObservable(this.data).pipe(
    switchMap(value => (isObservable(value) ? value : of(value)))
  );

  paginationChange = output<GridSortChangeEvent>();

  sortKey = signal<string>('id');
  sortDirection = signal<SortDirection>(SortDirection.ASC);

  onSort(key: string): void {
    const currentDirection = this.sortDirection();

    if (this.sortKey() === key) {
      this.sortDirection.set(currentDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      this.sortKey.set(key);
      this.sortDirection.set(SortDirection.ASC);
    }

    this.paginationChange.emit({
      sortKey: this.sortKey(),
      sortDirection: this.sortDirection(),
    });
  }
}

