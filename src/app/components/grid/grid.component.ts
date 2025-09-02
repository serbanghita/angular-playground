import {Component, inject, signal, effect, ChangeDetectionStrategy} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 't-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (items(); as items) {
      <table class="css-grid-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Color</th>
        </tr>
        </thead>
        <tbody>
          @for (item of items; track item.id) {
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td [style.color]="item.color">{{ item.color }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p>Loading items...</p>
    }
  `
})
export class GridComponent {
  private dataService = inject(ItemsService);
  items = toSignal(this.dataService.getItems(), { initialValue: undefined });
}
