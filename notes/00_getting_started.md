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
