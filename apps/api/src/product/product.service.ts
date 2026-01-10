import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ProductService {
  private readonly products: FirebaseFirestore.CollectionReference<ProductModel>;

  constructor(firebase: FirebaseService) {
    this.products = firebase.collection<ProductModel>('products');
  }

  async findAll(): Promise<ProductModel[]> {
    const snapshot = await this.products.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findById(id: string): Promise<ProductModel | null> {
    const doc = await this.products.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }
}
