import {Component, input, computed, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 't-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrl: './progress.component.css',
  templateUrl: './progress.component.html',
})
export class ProgressComponent {
  static MIN_RADIUS = 50;

  // This dictates width/height (which imo is not ideal for high-lvl usage).
  // I'd prefer to have predefined sizes: S, M, L or
  // 16, 32, 48, 64, 96, 128
  radius = input<number, number>(ProgressComponent.MIN_RADIUS, {
    transform: (value) => Math.max(ProgressComponent.MIN_RADIUS, value)
  });
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
    // Don't go below 0 or above 100.
    const boundedProgress = Math.max(0, Math.min(100, this.progress()));
    return (this.circumference - (boundedProgress / 100) * this.circumference).toString();
    // return (this.circumference - (this.progress() / 100) * this.circumference).toString();
  });

}
