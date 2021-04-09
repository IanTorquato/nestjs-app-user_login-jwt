import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/modules/user/user.service';
import { TokenService } from 'src/modules/token/token.service';
import { LoginResponse, LoginUserDto } from '../user/dto/user.dto';
import { ResponseError } from 'src/globalDto/error.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {
    // Empty
  }

  async login({
    email,
    password,
  }: LoginUserDto): Promise<LoginResponse | ResponseError> {
    const user = (await this.userService.findOne(email)) as User;

    if (!user) {
      return { error: 'Usuário não encontrado, verifique o e-mail.' };
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const access_token = this.jwtService.sign({ id: user.id });

      await this.tokenService.save(access_token, user.id);

      return { access_token };
    }

    return { error: 'Senha de usuário incorreta' };
  }
}
