## Setting up GraphQL Angular

- Install deps

```bash
pnpm add @apollo-angular
```

- Create the config

```ts
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

export function apolloOptionsFactory(): ApolloClient.Options {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
```

- update `app.config.ts` with the `graphqlProviderConfig`

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes), graphqlProvider],
};
```

### Creating an Angular elements through generator

```bash
# component
pnpm nx g @nx/angular:component apps/client/src/products/products

# service
pnpm nx g @nx/angular:service <name> --project=<project> --path=<path>
pnpm nx g @nx/angular:service products.service --project=client --path=apps/client/src/products
```
