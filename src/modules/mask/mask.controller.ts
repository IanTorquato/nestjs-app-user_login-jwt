import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ResponseError } from 'src/globalDto/error.dto';
import { CreateMaskDto } from './dto/mask.dto';
import { Mask } from './mask.entity';
import { MaskService } from './mask.service';

@Controller('masks')
export class MaskController {
  constructor(private readonly maskService: MaskService) {
    // Empty
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateMaskDto): Promise<Mask | ResponseError> {
    return this.maskService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Mask[] | ResponseError> {
    return this.maskService.findAll();
  }
}
