import { Component, input } from '@angular/core';
import {GridItem} from './grid.types';

@Component({
  selector: 't-column',
  standalone: true,
  template: '',
})
export class ColumnComponent<T extends GridItem> {
  name = input.required<string>();
  property = input.required<keyof T & string>();
  sortable = input(true);
}
