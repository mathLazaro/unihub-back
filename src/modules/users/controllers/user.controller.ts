import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ViewUserDto } from '../dtos/view-user.dto';
import { JwtGuard } from '@shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post('/create')
  @HttpCode(201)
  async create(@Body() user: CreateUserDto): Promise<ViewUserDto> {
    return await this.service.create(user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('/find')
  getHello(): string {
    return this.service.getHello();
  }
}
