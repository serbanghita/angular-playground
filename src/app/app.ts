import { Component, signal } from '@angular/core';
import {Progress} from './components/progress/progress';

@Component({
  selector: 'app-root',
  imports: [Progress],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
