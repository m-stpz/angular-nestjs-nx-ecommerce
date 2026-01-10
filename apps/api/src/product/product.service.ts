import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @Inject('FIRESTORE')
    private readonly db: Firestore,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    const snapshot = await this.db.collection('products').get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ProductModel, 'id'>),
    }));
  }

  async findById(id: string): Promise<ProductModel | null> {
    const doc = await this.db.collection('products').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...(doc.data() as Omit<ProductModel, 'id'>),
    };
  }
}
