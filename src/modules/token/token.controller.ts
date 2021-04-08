import { Body, Controller, Put } from '@nestjs/common';

import { DataRefreshToken } from './dto/token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {
    // Empty
  }

  @Put('refresh')
  async refreshToken(@Body() data: DataRefreshToken) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
