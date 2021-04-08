import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from 'src/modules/token/token.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService],
  imports: [
    UserModule,
    TokenModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
})
export class AuthModule {
  // Empty
}
