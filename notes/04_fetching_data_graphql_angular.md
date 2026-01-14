# Fetching data Angular Graphql

## GET

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
  - creates a reactive GraphQL query
  - returns a QueryRef
  - "Describe what to watch"
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

## Data flow (Top to Bottom)

```txt
Angular Product component: Renders data
  ↓
Angular Product service: How to fetch the data from the backend and send it to the component in a friendly format
  ↓
Apollo Client: Executes GraphQL operations, manages cache
  ↓
GraphQL API (schema + query): Defines WHAT can be fetched, the API contract
  ↓
ProductResolver: Maps the query to the backend logic. The traffic controller
  ↓
ProductService.findAll(): Data access + business rules, the brain. It's where the business logic should live
  ↓
Firebase: the db
```

Ng Product Component -> Ng ProductService -> GraphQL Query Product -> NestJS Product Resolver -> NestJS Product service -> NestJS Firebase service

1. Angular `Products` component: What to do with the data
   - Displays data
   - Knows nothing of GraphQL, Firebase or NestJS
   - Just subscribes to an `Observable<Product[]>`

```ts
// it's a convention if it's an observable, to add <variable>$ -- the dollar sign at the end
// the `$` means: this is an Observable, not a value
products$ = this.productsService.getProducts();
```

2. Angular `ProductsService`: Get the data and return it into a friendly-format

- Talks to GraphQL
- Hides Apollo details
- Converts GraphQL shape into -> Product[]

```
watchQuery -> valueChanges -> map(...)
```

3. GraphQL Query: API contract

- Defines the required data
- No logic
- No db access

```
query {
  products {
    id
    name
    price
  }
}
```

4. NestJS ProductResolver: Traffic controller

- Entry point for GraphQL
- Maps GraphQL query -> service call
- No business logic

```ts
@Query(() => [ProductModel])
products(){
  return this.productService.findAll();
}
```

5. NestJS ProductService: The brain

- Knows Firebase
- Fetches documents
- Maps Firestore -> domain objects
- Central place for business rules

```ts
async findAll() {...}
```

6. Firebase: the db

- Stores data
- No knowledge of GraphQL or Angular

```ts
this.products.get();
```
