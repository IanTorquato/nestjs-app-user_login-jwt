import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserService } from 'src/modules/user/user.service';
import { Token } from './token.entity';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    // Empty
  }

  async save(hash: string, id: number) {
    const existentToken = await this.tokenRepository.findOne({
      user: { id },
    });

    if (!existentToken) {
      return this.tokenRepository.insert({ hash, user: { id } });
    }

    return this.tokenRepository.update(existentToken.id, { hash });
  }

  async refreshToken(oldToken: string) {
    const existentToken = await this.tokenRepository.findOne({
      hash: oldToken,
    });

    if (existentToken) {
      const user = await this.userService.findOne(existentToken.user.email);

      return await this.authService.login(user.id, user.email);
    }

    return new HttpException(
      { errorMessage: 'Token Inválido' },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async findAll() {
    return await this.tokenRepository.find();
  }
}
