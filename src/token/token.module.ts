import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { TokenController } from './token.controller';
import { tokenProvider } from './token.provider';
import { TokenService } from './token.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), UserModule],
  providers: [...tokenProvider, TokenService],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {
  // Empty
}
