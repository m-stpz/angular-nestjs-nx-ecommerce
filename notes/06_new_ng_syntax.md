# New Angular Syntax

## Control flow

```html
<!-- old ❌ -->
<div *ngIf="<conditional>"></div>
<li *ngFor="let item of items; trackBy: trackById"></li>
```

```
<!-- new ✅ -->
@if (<conditional>){
<div></div>
}


@for (item of items; track item.id){
    <li>{{item.name}}</li>
}
```

## Async data

```html
<!-- old ❌ -->
<div *ngIf="products$ | async as products">
  <div *ngFor="let p of products">{{p.name}}</div>
</div>
```

```
<!-- new ✅ -->
@if (products$ | async; as products){
    @for(p of products; track p.id){
        {{p.name}}
    }
}
```

## Conditional branching

```html
<!-- old ❌ -->
<div *ngIf="loading; else content">Loading...</div>
<ng-template #content>Content</ng-template>
```

```
<!-- new ✅ -->

@if (loading){
    Loading...
} @else {
    Content
}
```

## Standalone components

```ts
// old ❌
@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule],
})
export class ProductsModule {}

// new ✅
@Component({
  standalone: true,
  imports: [CommonModule],
})
export class ProductsModule {}
```

## Dependency injection

```ts
export class ProductsModule {
  // old ❌
  constructor(private service: ProductsService) {}

  // new ✅
  private service = inject(ProductsService);
}
```

## Signals (Angular's reactive core)

```ts
// old ❌
products$ = this.service.getProducts();

// new ✅
products = toSignal(this.service.getProducts());
```

- Then, with the new signal, the template gets:

```
@for (p of products(); track p.id){
    {{p.name}}
}
```
