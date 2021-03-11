import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/modules/user/user.service';
import { TokenService } from 'src/modules/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {
    // Empty
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return undefined;
  }

  async login(id: number, email: string) {
    const payload = { id, email };
    const token = this.jwtService.sign(payload);

    await this.tokenService.save(token, id);

    return { access_token: token };
  }
}
