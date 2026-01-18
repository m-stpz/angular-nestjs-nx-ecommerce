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
