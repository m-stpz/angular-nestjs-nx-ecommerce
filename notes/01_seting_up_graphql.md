## 1. Installing deps

```bash
pnpm add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

## 2. Enable GraphQL in Nest

```ts
// apps/api/src/app/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
    }),
  ],
})
export class AppModule {}
```

## 3. Create Product GraphQL model (DTO)

```bash
pnpm nx g @nx/nest:class ./apps/api/src/product/product.model

# see apps/api/src/product/product.model.ts
```

## 4. Create product service

```bash
pnpm nx g @nx/nest:service ./apps/api/src/product/product

# see apps/api/src/product/product.service
```
