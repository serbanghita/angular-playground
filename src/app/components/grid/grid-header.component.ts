import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirection } from './grid.types';

@Component({
  selector: 't-grid-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    {{ name() }}
    @if (isSortable() && sortKey() === key()) {
      <span>{{ sortDirection() === SortDirection.ASC ? '▲' : '▼' }}</span>
    }
  `,
  host: {
    class: 'table-flex-th',
    '[class.sortable]': 'isSortable()', // Add class for cursor styling.
    '(click)': 'onClick()',
  },
  styles: [`
    :host.sortable:hover {
      cursor: pointer;
      background-color: #e9e9e9;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridHeaderComponent {
  name = input.required<string>();
  key = input.required<string>();
  isSortable = input(true);
  sortKey = input<string>();
  sortDirection = input<SortDirection>();
  sort = output<string>();

  onClick(): void {
    if (this.isSortable()) {
      this.sort.emit(this.key());
    }
  }

  protected readonly SortDirection = SortDirection;
}
