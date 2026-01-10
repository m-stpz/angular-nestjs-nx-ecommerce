# Getting started

## NestJS

```bash
npx create-nx-workspace@latest app --preset=ts --workspaces=false --packageManager=pnpm

cd app
pnpm nx add @nx/nest
pnpm nx g @nx/nest:app apps/api # or apps/<any-name>
pnpm nx serve api
```

## Installing Firebase

```
pnpm install firebase-admin
pnpm install firebase
```

### Reading values from .env

- Go to the configurations of the project and get the config info

1. Sensitive data should be added to the .env

```ts
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
};
```

2. Load .env on nestjs

```ts
// apps/api/src/app/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
    }),
  ],
})
export class AppModule {}
```

3. Generate service within nx

```bash
npm nx g @nx/nest:service ./apps/api/src/firebase/firebase
```

4. Read it on the firebase service

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  constructor(private readonly config: ConfigService) {}

  apiKey = this.config.get<string>('FIREBASE_API_KEY'); // reading from the .env
}
```

## Generating commands

- Since we're using nx, we shouldn't run `nest generate module <name>`. Why?
  - It bypasses Nx project graph
  - It can generate files in the wrong place
  - Breaks Nx caching
- So, how should we?

```bash
pnpm nx g @nx/nest:module <path>
pnpm nx g @nx/nest:module ./apps/api/src/firebase/firebase
```
