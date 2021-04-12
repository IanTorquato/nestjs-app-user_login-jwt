import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { config } from 'dotenv';

config();

import { AppModule } from './app.module';
import { InternalServerException } from './globalExceptions/exceptionsRemaining.filter';
import { NotFoundException } from './globalExceptions/notFoundException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new InternalServerException());
  app.useGlobalFilters(new NotFoundException());

  await app.listen(3333, () => console.log('Server running on post 3333'));
}

bootstrap();
