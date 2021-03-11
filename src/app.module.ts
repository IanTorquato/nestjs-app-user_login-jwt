import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { MaskModule } from './modules/mask/mask.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DatabaseModule, AuthModule, TokenModule, MaskModule],
})
export class AppModule {
  // Empty
}
