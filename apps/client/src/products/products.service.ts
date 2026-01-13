import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Product } from './product.model';
import { FETCH_PRODUCTS } from '../app/graphql/queries';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apollo = inject(Apollo);

  getProducts() {
    return this.apollo
      .watchQuery<{ products: Product[] }>({
        query: FETCH_PRODUCTS,
      })
      .valueChanges.pipe(map((result) => result.data?.products));
  }
}
