# Getting started

```bash
npx create-nx-workspace@latest app --preset=ts --workspaces=false --packageManager=pnpm

cd app
pnpm nx add @nx/nest
pnpm nx g @nx/nest:app apps/api # or apps/<any-name>
```
