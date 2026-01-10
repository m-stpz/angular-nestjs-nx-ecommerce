import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductModel])
  products() {
    return this.productService.findAll();
  }

  @Query(() => ProductModel, { nullable: true })
  product(@Args('id') id: string) {
    return this.productService.findById(id);
  }
}
