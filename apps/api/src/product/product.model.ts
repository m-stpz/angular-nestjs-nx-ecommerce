import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  price: number;

  @Field()
  stripePriceId: string;

  @Field()
  isFeatured: boolean;

  @Field()
  createdAt: number;

  @Field()
  updatedAt: number;
}
