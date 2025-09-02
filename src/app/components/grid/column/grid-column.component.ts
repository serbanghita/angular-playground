import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 't-column',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TColumnComponent<T> {
  name = input.required<string>();
  property = input.required<keyof T>();
  sortable = input<boolean>(false);
}
