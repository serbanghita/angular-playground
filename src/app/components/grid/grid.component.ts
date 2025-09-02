import {Component, inject, signal, effect, ChangeDetectionStrategy} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 't-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './grid.template.html',
})
export class GridComponent {
  private dataService = inject(ItemsService);
  items = toSignal(this.dataService.getItems(), { initialValue: undefined });
}
