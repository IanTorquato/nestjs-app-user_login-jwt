import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/modules/user/user.service';
import { TokenService } from 'src/modules/token/token.service';
import { UserDataLogin, UserLoginSuccessful } from '../user/dto/user.dto';
import { ResponseError } from 'src/globalDto/error.dto';

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
  }: UserDataLogin): Promise<UserLoginSuccessful | ResponseError> {
    const user = await this.userService.findOne(email);

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
