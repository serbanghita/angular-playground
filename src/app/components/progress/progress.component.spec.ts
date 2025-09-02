import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import {ComponentRef, provideZonelessChangeDetection} from '@angular/core';

describe('Progress Component', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;
  let ref: ComponentRef<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressComponent],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bound progress to 0-100 range (e.g., -10 -> 0)', () => {

    ref.setInput('progress', -10);
    fixture.detectChanges();
    expect(component.dashOffset()).toBe(component.circumference.toString());
  });

  it('should bound progress to 0-100 range (e.g., 110 -> 100)', () => {
    ref.setInput('progress', 110);
    fixture.detectChanges();
    expect(component.dashOffset()).toBe('0');
  });
  it('should render with custom colors and stroke width', () => {
    ref.setInput('color', '#ff0000');
    ref.setInput('progressColor','#00ff00');
    ref.setInput('strokeWidth', 5);
    fixture.detectChanges();

    const bgCircle = fixture.nativeElement.querySelector('circle[data-testid="progress-circle-in-background"]');
    const progressCircle = fixture.nativeElement.querySelector('circle[data-testid="progress-circle-in-foreground"]');

    expect(bgCircle.getAttribute('stroke')).toBe('#ff0000');
    expect(bgCircle.getAttribute('stroke-width')).toBe('5');
    expect(progressCircle.getAttribute('stroke')).toBe('#00ff00');
    expect(progressCircle.getAttribute('stroke-width')).toBe('5');
  });

});
