import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { MaskController } from './mask.controller';
import { maskProvider } from './mask.provider';
import { MaskService } from './mask.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MaskController],
  providers: [...maskProvider, MaskService],
})
export class MaskModule {
  // Empty
}
