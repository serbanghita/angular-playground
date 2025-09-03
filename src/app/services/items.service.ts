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
