import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { Apollo } from 'apollo-angular';
import { Product } from './product.model';
import { FETCH_PRODUCTS } from '../app/graphql/queries';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone: true, // why standalone?
  imports: [CommonModule, MatCardModule, MatGridListModule, MatChipsModule],
})
export class Products {
  // private readonly apollo = inject(Apollo);

  // products$ = this.apollo
  //   .watchQuery<{ products: Product[] }>({
  //     query: FETCH_PRODUCTS,
  //   })
  //   .valueChanges.pipe(
  //     tap((result) => {
  //       console.log('Apollo raw result:', result);
  //     }),
  //     map((result) => result.data?.products),
  //   );

  private readonly http = inject(HttpClient);

  ngOnInit() {
    this.http
      .get('http://localhost:3000/graphql?query={products{id name price}}')
      .subscribe({
        next: (res) => console.log('HTTP RESULT', res),
        error: (err) => console.error('HTTP ERROR', err),
      });
  }
}
