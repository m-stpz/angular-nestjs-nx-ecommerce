import 'reflect-metadata';
import * as admin from 'firebase-admin';
import { products } from './products.config';
import { firebaseConfig } from '../firebase/firebase.config';

admin.initializeApp({
  // to check whether this works
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore();

async function seedProducts() {
  for (const product of products) {
    const ref = await db.collection('products').add(product);
    console.log(`Created product ${product.name} → ID: ${ref.id}`);
  }

  process.exit(0);
}

seedProducts().catch((err) => {
  console.error(err);
  process.exit(1);
});
