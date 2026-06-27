import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ViewUserDto } from '../dtos/view-user.dto';
import { JwtGuard } from '@shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostType } from '@root/modules/posts/enums/post-type.enum';
import { CurrentUserId } from '@root/shared/decorators/current-user.decorator';

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
  @Post('/subscribe-tag')
  async subscribeTag(
    @CurrentUserId() userId: string,
    @Body() tags: PostType[]
  ): Promise<void> {
    this.service.subscribeTag(tags, userId);
  }
}
