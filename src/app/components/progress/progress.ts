import {Component, input, computed, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 't-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .progress {

    }
    .progress-container {
      /*border: 1px solid red;*/
      position: relative;
    }`,
  template: `<div class="progress">
    <div class="progress-container" [style.width.px]="radius() * 2" [style.height.px]="radius() * 2">
      <svg viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          data-testid="progress-circle-in-background"
          cx="50" cy="50" r="45"
          fill="none" [attr.stroke]="color()" [attr.stroke-width]="strokeWidth()" />
        <!-- Progress circle -->
        <circle
          data-testid="progress-circle-in-foreground"
          cx="50" cy="50" r="45"
          fill="none" [attr.stroke]="progressColor()"
          [attr.stroke-width]="strokeWidth()"
          stroke-linecap="round"
          [attr.transform]="'rotate(-90 50 50)'"
          [style.stroke-dasharray]="dashArray"
          [style.stroke-dashoffset]="dashOffset()" />
      </svg>
    </div>
  </div>`
})
export class Progress {
  // This dictates width/height (which imo is not ideal for high-lvl usage).
  // I'd prefer to have predefined sizes: S, M, L or
  // 16, 32, 48, 64, 96, 128
  radius = input<number>(50);
  progress = input<number>(0);

  // Styling
  strokeWidth = input<number>(10);
  color = input<string>("#efefef");
  progressColor = input<string>("#0000ff")

  // progressCircleRef = viewChild<ElementRef<SVGCircleElement>>('progressCircle');

  // This is a fixed value because we only scale "progress-container".
  // circle circumference = 2*PI*r
  circumference: number = 2 * Math.PI * 45;

  dashArray: string = `${this.circumference} ${this.circumference}`;

  dashOffset = computed(() => {
    return (this.circumference - (this.progress() / 100) * this.circumference).toString();
  });


  ngOnInit() {
    //console.log('ngOnInit');
    if (this.radius() < 50) {
      throw new Error(`Radius must be set above 50.`);
    }
    if (this.progress() < 0 || this.progress() > 100) {
      throw new Error(`Progress was set out of bounds. Must be between 0 and 100.`);
    }
  }
}
