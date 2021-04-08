import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Token } from './token.entity';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    // Empty
  }

  async save(hash: string, userId: number) {
    const tokenExist = await this.tokenRepository.findOne({
      user: { id: userId },
    });

    if (!tokenExist) {
      return this.tokenRepository.insert({ hash, user: { id: userId } });
    }

    return this.tokenRepository.update(tokenExist.id, { hash });
  }

  async refreshToken(oldToken: string) {
    const tokenExist = await this.tokenRepository.findOne({
      hash: oldToken,
    });

    if (!tokenExist) {
      return { error: 'Este token não existe para ser atualizado!' };
    }

    const { email, password } = tokenExist.user;

    return await this.authService.login({ email, password });
  }
}
