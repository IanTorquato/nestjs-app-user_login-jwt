import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseError } from 'src/globalDto/error.dto';
import { UserDataCreate } from './dto/user.dto';
import { User } from './user.entity';
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
  async create(@Body() data: UserDataCreate): Promise<User | ResponseError> {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    const { id, email } = request.user;

    return this.authService.login(id, email);
  }
}
