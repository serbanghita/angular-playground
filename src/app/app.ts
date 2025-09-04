import { Component, signal } from '@angular/core';
import {ProgressComponent} from './components/progress/progress.component';
import {GridComponent} from './components/grid/grid.component';
import {GridColumnComponent} from './components/grid/column/grid-column.component';
import {PaginationChangeEvent} from './components/grid/grid.types';

@Component({
  selector: 'app-root',
  imports: [ProgressComponent, GridComponent, GridColumnComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // 1. The parent component holds the page size in its own signal.
  pageSizeState = signal<number | null>(5);

  randomData = signal([
    { id: 1, name: 'Item One', color: 'red' },
    { id: 2, name: 'Item Two', color: 'blue' },
    { id: 3, name: 'Item Three', color: 'green' },
    { id: 4, name: 'Item Four', color: 'orange' },
    { id: 5, name: 'Item Five', color: 'violet' },
    { id: 6, name: 'Item Six', color: 'purple' },
    { id: 7, name: 'Item Seven', color: 'teal' },
    { id: 8, name: 'Item Eight', color: 'salmon' },
    { id: 9, name: 'Item Nine', color: 'gold' },
    { id: 10, name: 'Item Ten', color: 'lime' },
    { id: 11, name: 'Item Eleven', color: 'silver' },
    { id: 12, name: 'Item Twelve', color: 'khaki' },
  ]);

  // 2. The event handler's only job is to update the parent's state.
  performFetch(event: PaginationChangeEvent): void {
    console.log('Parent received change and is updating its state:', event);
    this.pageSizeState.set(event.pageSize);
  }
}
