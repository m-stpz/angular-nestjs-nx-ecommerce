## Fetching data Angular Graphql

### GET

- Data fetching should happen within a service, not a component

```ts
// apps/client/src/products/products.service
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
    // watchQuery: keeps emitting the correct data
    return this.apollo.watchQuery<{ products: Product[] }>({ query: FETCH_PRODUCTS }).valueChanges.pipe(map((result) => result.data?.products));
  }
}
```

```ts
watchQuery() // keep the query updated
  .valueChanges // turn Apollo into Observable
  .pipe(map()); // strip GraphQL/Apollo shape
```

- `watchQuery`: run this query and keep it in sync with Apollo cache
  - automatic refetch on: cache updates, mutations, refetch calls
- `valueChanges`: watchQuery returns a QueryRef, not data. So, we need valueChanges to consume the data
- `pipe`: apollo emits more than just data

```txt
{
  data, loading, errors, networkStatus
}
```

- `map((result) => result.data.products)`: Converts `ApolloQueryResult<{products:Product[]}>` into `Product[]`

```txt
Angular (apollo)
    -> GraphQL query (FETCH_PRODUCTS)
        -> GraphQL resolver (NestJS)
            -> ProductService.findAll()
                -> Firebase
```

### Data flow (Top to Bottom)

1. Angular `Products` component
   - Displays data
   - Knows nothing of GraphQL, Firebase or NestJS
   - Just subscribes to an `Observable<Product[]>`

=== TO CONTINUE ===
