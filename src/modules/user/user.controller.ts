import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ResponseError } from 'src/globalDto/error.dto';
import {
  CreateUserDto,
  FindUserDto,
  LoginResponse,
  LoginUserDto,
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
    @Body() data: CreateUserDto,
  ): Promise<FindUserDto | ResponseError> {
    return this.userService.create(data);
  }

  @Post('login')
  async login(
    @Body() data: LoginUserDto,
  ): Promise<LoginResponse | ResponseError> {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Request() request: any,
  ): Promise<FindUserDto[] | ResponseError> {
    Logger.verbose(request.user, 'User Controller -> findAll', false);

    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async findOne(
    @Param() data: string,
    @Request() request: any,
  ): Promise<FindUserDto | ResponseError> {
    Logger.verbose(request.user, 'User Controller -> findOne', false);

    return await this.userService.findOne(data);
  }
}
