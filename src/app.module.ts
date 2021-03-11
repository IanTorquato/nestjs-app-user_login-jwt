import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MaskModule } from './mask/mask.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DatabaseModule, AuthModule, TokenModule, MaskModule],
})
export class AppModule {
  // Empty
}
