import { Component, signal } from '@angular/core';
import {ProgressComponent} from './components/progress/progress.component';
import {GridComponent} from './components/grid/grid.component';

@Component({
  selector: 'app-root',
  imports: [ProgressComponent, GridComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
