import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
  }

  collection<T = FirebaseFirestore.DocumentData>(name: string) {
    return this.db.collection(name) as FirebaseFirestore.CollectionReference<T>;
  }

  doc<T = FirebaseFirestore.DocumentData>(path: string) {
    return this.db.doc(path) as FirebaseFirestore.DocumentReference<T>;
  }
}
