import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ViewUserDto } from '../dtos/view-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post('/create')
  @HttpCode(201)
  async create(@Body() user: CreateUserDto): Promise<ViewUserDto> {
    return await this.service.create(user);
  }
}
