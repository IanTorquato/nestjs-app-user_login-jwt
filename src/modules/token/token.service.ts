import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { ResponseError } from 'src/globalDto/error.dto';
import { LoginResponse } from '../user/dto/user.dto';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
  ) {
    // Empty
  }

  async save(hash: string, userId: number) {
    return await this.tokenRepository
      .insert({ hash, user: { id: userId } })
      .catch((err) => {
        console.error('Falha ao salvar o Token!');

        Logger.error(err);
      });
  }

  async refreshToken(oldToken: string): Promise<LoginResponse | ResponseError> {
    const tokenExist = await this.tokenRepository.findOne({
      hash: oldToken,
    });

    if (!tokenExist) {
      return { error: 'Este token não existe para ser atualizado!' };
    }

    const { id } = tokenExist.user;

    const access_token = this.jwtService.sign({ id });
    await this.tokenRepository.update(id, { hash: access_token });

    return { access_token };
  }
}
