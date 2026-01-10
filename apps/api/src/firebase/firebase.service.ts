import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  constructor(private readonly config: ConfigService) {}

  apiKey = this.config.get<string>('FIREBASE_API_KEY'); // reading from the .env
}
