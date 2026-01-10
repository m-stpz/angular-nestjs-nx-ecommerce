# Getting started

## NestJS

```bash
npx create-nx-workspace@latest app --preset=ts --workspaces=false --packageManager=pnpm

cd app
pnpm nx add @nx/nest
pnpm nx g @nx/nest:app apps/api # or apps/<any-name>
pnpm nx serve api
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
npm nx g @nx/nest:service ./apps/api/src/firebase/firebase

```

## Installing firebase on nestjs

https://medium.com/@elangoram1998/getting-started-with-firebase-admin-in-nest-js-71f676e73e6

- 1. Install deps

```
npm install firebase-admin @nestjs/config
```

- 2. Obtain admin sdk configuration

- Project settings -> Service accounts
- Click on "Generate new private key"
- Transform the config.json into .env
  - Add the .env at the root

- 3. Allow the `ConfigModule` to load the environment variables

```ts
// apps/api/src/app/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true, // increases performance
    }),
  ],
})
export class AppModule {}
```

- 4. Integrate Firebase admin into Nestjs

```ts
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseProvider: Provider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('FIREBASE_TYPE'),
      project_id: configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      client_id: configService.get<string>('FIREBASE_CLIENT_ID'),
      auth_uri: configService.get<string>('FIREBASE_AUTH_URI'),
      token_uri: configService.get<string>('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: configService.get<string>('FIREBASE_AUTH_CERT_URL'),
      client_x509_cert_url: configService.get<string>('FIREBASE_CLIENT_CERT_URL'),
      universe_domain: configService.get<string>('FIREBASE_UNIVERSAL_DOMAIN'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  providers: [firebaseProvider],
  imports: [ConfigModule],
  exports: [],
})
export class FirebaseModule {}
```

## Passing credentials to the seed

```ts
// apps/api/src/seed
import 'dotenv/config';
import * as admin from 'firebase-admin';
import { products } from './products.config';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  });
}
```

## Adding custom scripts to NX

- Add the script on the the workspace `project.json`
