import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone: true, // new type of angular components that doesn't need to be declared in a `NgModule`
  imports: [CommonModule, MatCardModule, MatGridListModule, MatChipsModule],
})
export class Products {
  private readonly productsService = inject(ProductsService);

  readonly products$ = this.productsService.getProducts();
}
