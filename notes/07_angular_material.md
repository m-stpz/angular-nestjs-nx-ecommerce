# Angular Material

## Installation

```bash
# install deps
pnpm nx add @angular/material

# setup on project
pnpm nx g @angular/material:ng-add --project=client
```

## Schematics

- Allows us to create Material applications easier

```bash
pnpm nx g @angular/material:address-form --project=client
```

- Beyond the installation one, we also have use the following schematics to generate Material Design components

```
address-form
navigation
dashboard
table
tree
```

#### Drag and drop

- Comes from `@angular/cdk`

```bash
ng generate @angular/cdk:drag-drop <component-name>
```
