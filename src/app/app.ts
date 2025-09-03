import { Component, signal } from '@angular/core';
import {ProgressComponent} from './components/progress/progress.component';
import {GridComponent} from './components/grid/grid.component';
import {ColumnComponent} from './components/grid/column.component';
import {performFetch} from './services/items.service';

@Component({
  selector: 'app-root',
  imports: [ProgressComponent, GridComponent, ColumnComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly performFetch = performFetch;
}
