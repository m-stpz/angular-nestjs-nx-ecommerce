import { Route } from '@angular/router';
import { Products } from '../products/products';
import { Playground } from '../playground/playground';

export const appRoutes: Route[] = [
  { path: '', component: Products },
  { path: 'playground', component: Playground },
];
