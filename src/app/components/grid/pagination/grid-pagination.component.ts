import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationChangeEvent } from '../grid.types';

@Component({
  selector: 't-grid-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pagination.component.html',
  styleUrl: './grid-pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPaginationComponent {
  currentPage = input.required<number>();
  total = input.required<number>();
  pageSize = input.required<number | null>();

  paginationChange = output<PaginationChangeEvent>();

  totalPages = computed(() => {
    const ps = this.pageSize();
    return ps ? Math.ceil(this.total() / ps) : 1;
  });

  isFirstPage = computed(() => this.currentPage() === 1);
  isLastPage = computed(() => this.currentPage() === this.totalPages());

  startItem = computed(() => {
    const ps = this.pageSize();
    if (!ps) {
      return 1;
    }
    return (this.currentPage() - 1) * ps + 1;
  });

  endItem = computed(() => {
    const ps = this.pageSize();
    const totalItems = this.total();
    if (!ps) {
      return totalItems;
    }
    return Math.min(this.currentPage() * ps, totalItems);
  });

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.paginationChange.emit({
        currentPage: page,
        pageSize: this.pageSize(),
      });
    }
  }

  onPageSizeChange(event: Event): void {
    console.log('onPageSizeChange', event);
    const element = event.target as HTMLSelectElement;
    const size = element.value === 'null' ? null : Number(element.value);
    this.paginationChange.emit({
      currentPage: 1,
      pageSize: size,
    });
  }
}
