import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MaskModule } from './modules/mask/mask.module';
import { TokenModule } from './modules/token/token.module';

@Module({
  controllers: [],
  providers: [],
  imports: [DatabaseModule, AuthModule, TokenModule, MaskModule],
})
export class AppModule {
  // Empty
}
