import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { config } from 'dotenv';

config();

import { AppModule } from './app.module';
import { RemainingExceptionFilter } from './globalExceptionFilters/remaining.exception';
import { NotFoundExceptionFilter } from './globalExceptionFilters/notFound.exception';
import { ConflictExceptionFilter } from './globalExceptionFilters/conflict.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new RemainingExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new ConflictExceptionFilter());

  await app.listen(3333, () => console.log('Server running on post 3333'));
}

bootstrap();
