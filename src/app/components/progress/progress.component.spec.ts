import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import {provideZonelessChangeDetection } from '@angular/core';

describe('Progress Component', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressComponent],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate dashOffset correctly for default progress (0)', () => {
    expect(component.dashOffset()).toBe(component.circumference.toString());
  });

  it('should calculate dashOffset correctly for progress 50', () => {
    fixture.componentRef.setInput('progress', 50);
    fixture.detectChanges();
    const expectedOffset = component.circumference - (50 / 100) * component.circumference;
    expect(component.dashOffset()).toBe(expectedOffset.toString());
  });

  it('should render with custom colors and stroke width', () => {
    const ref = fixture.componentRef;
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
