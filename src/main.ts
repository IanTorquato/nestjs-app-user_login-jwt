import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { config } from 'dotenv';

config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3333, () => console.log('Server running on post 3333'));
}

bootstrap();
