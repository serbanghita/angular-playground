import {Component, input, provideZonelessChangeDetection, signal} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridComponent } from './grid.component';
import { GridColumnComponent } from './column/grid-column.component';
import { GridData, GridItem } from './grid.types';

@Component({
  standalone: true,
  imports: [GridComponent, GridColumnComponent],
  template: `
    <t-grid [data]="data()" [pageSize]="pageSize()">
      <t-column name="ID" property="id"></t-column>
      <t-column name="Name" property="name"></t-column>
    </t-grid>
  `,
})
class TestHostComponent {
  data = input<GridData<GridItem> | null>();
  pageSize = input<number | null>(5);
}

describe('GridComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should display "No items to display" message when data is empty', () => {
    const testData: GridData<GridItem> = { items: [], total: 0 };
    fixture.componentRef.setInput('data', testData);
    fixture.detectChanges();

    const noItemsMessage = fixture.debugElement.query(
      By.css('[data-testid="no-items-message"]')
    );
    const gridContainer = fixture.debugElement.query(
      By.css('[data-testid="grid-container"]')
    );

    expect(noItemsMessage).toBeTruthy();
    expect(gridContainer).toBeFalsy();
    expect(noItemsMessage.nativeElement.textContent).toContain('No items to display.');
  });


  it('should display two rows and have disabled pagination controls for 2 items', () => {
    const testData: GridData<GridItem> = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
      total: 2,
    };
    fixture.componentRef.setInput('data', testData);
    fixture.detectChanges();

    const perPageSelector = fixture.debugElement.query(
      By.css('[data-testid="page-size-selector-select"]')
    );

    const gridRows = fixture.debugElement.queryAll(
      By.css('[data-testid="grid-row"]')
    );
    const pagination = fixture.debugElement.query(
      By.css('[data-testid="grid-pagination"]')
    );
    const backButton = fixture.debugElement.query(
      By.css('[data-testid="pagination-back"]')
    );
    const forwardButton = fixture.debugElement.query(
      By.css('[data-testid="pagination-forward"]')
    );
    const summary = fixture.debugElement.query(
      By.css('[data-testid="pagination-summary"]')
    );

    expect(perPageSelector.properties['disabled']).toBe(true);
    expect(gridRows.length).toBe(2);
    expect(pagination).toBeTruthy();
    expect(backButton.properties['disabled']).toBe(true);
    expect(forwardButton.properties['disabled']).toBe(true);
    expect(summary.nativeElement.textContent.trim()).toBe('1 - 2 of 2');
  });

  it('should display rows and pagination for 6 items with a pageSize of 5', () => {
    const testData: GridData<GridItem> = {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
      ],
      total: 6,
    };
    fixture.componentRef.setInput('data', testData);
    fixture.componentRef.setInput('pageSize', 5);
    fixture.detectChanges();

    const gridRows = fixture.debugElement.queryAll(
      By.css('[data-testid="grid-row"]')
    );
    const pagination = fixture.debugElement.query(
      By.css('[data-testid="grid-pagination"]')
    );

    expect(gridRows.length).toBe(5);
    expect(pagination).toBeTruthy();
  });
});
