import { Body, Controller, Put } from '@nestjs/common';

import { ResponseError } from 'src/globalDto/error.dto';
import { LoginResponse } from '../user/dto/user.dto';
import { DataRefreshToken } from './dto/token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {
    // Empty
  }

  @Put('refresh')
  async refreshToken(
    @Body() data: DataRefreshToken,
  ): Promise<LoginResponse | ResponseError> {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
