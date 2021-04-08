import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ResponseError } from 'src/globalDto/error.dto';
import {
  UserCreateSuccessful,
  UserDataCreate,
  UserDataLogin,
  UserLoginSuccessful,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    // Empty
  }

  @Post()
  async create(
    @Body() data: UserDataCreate,
  ): Promise<UserCreateSuccessful | ResponseError> {
    return this.userService.create(data);
  }

  @Post('login')
  async login(
    @Body() data: UserDataLogin,
  ): Promise<UserLoginSuccessful | ResponseError> {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }
}
