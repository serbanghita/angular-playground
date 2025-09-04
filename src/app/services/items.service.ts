import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, Observable, of} from 'rxjs';

// export interface Item {
//   id: number;
//   name: string;
//   color: string;
// }
//
// @Injectable({ providedIn: 'root' })
// export class ItemsService {
//   private http = inject(HttpClient);
//
//   getItems(): Observable<Item[]> {
//     return of([
//       { id: 1, name: 'Item One', color: 'red' },
//       { id: 2, name: 'Item Two', color: 'blue' },
//       { id: 3, name: 'Item Three', color: 'green' }
//     ]).pipe(delay(5000));
//   }
// }

export function performFetch(e: any) {
  console.log('performFetch', e);
}

export function randomData() {
  return [
    { id: 1, name: 'Item One', color: 'red' },
    { id: 2, name: 'Item Two', color: 'blue' },
    { id: 3, name: 'Item Three', color: 'green' },
    { id: 4, name: 'Item Four', color: 'orange' },
    { id: 5, name: 'Item Five', color: 'violet' },
    { id: 6, name: 'Item Six', color: 'purple' },
    { id: 7, name: 'Item Seven', color: 'teal' },
    { id: 8, name: 'Item Eight', color: 'salmon' },
    { id: 9, name: 'Item Nine', color: 'gold' },
    { id: 10, name: 'Item Ten', color: 'lime' },
    { id: 11, name: 'Item Eleven', color: 'silver' },
    { id: 12, name: 'Item Twelve', color: 'khaki' },
  ];
}
