import 'dotenv/config';
import * as admin from 'firebase-admin';
import { products } from './products.config';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  });
}

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
