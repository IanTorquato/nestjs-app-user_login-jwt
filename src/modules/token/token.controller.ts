import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    return await this.tokenService.findAll();
  }
}
