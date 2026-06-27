import { Body, Controller, Get, HttpCode, Post, UseGuards, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ViewUserDto } from '../dtos/view-user.dto';
import { JwtGuard } from '@shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Put } from '@nestjs/common';
import { CurrentUserId } from '@root/shared/decorators/current-user.decorator';
import { PostType } from '@root/modules/posts/enums/post-type.enum';

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
  async getProfile(@CurrentUserId() userId: string): Promise<ViewUserDto> {
    return this.service.getProfile(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('/public/:id')
  async getPublicProfile(@Param('id') id: string): Promise<ViewUserDto> {
    return this.service.getPublicProfile(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Put('/')
  async updateProfile(
    @CurrentUserId() userId: string,
    @Body() body: any
  ): Promise<ViewUserDto> {
    return this.service.updateProfile(userId, body);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Put('/password')
  async updatePassword(
    @CurrentUserId() userId: string,
    @Body() body: any
  ): Promise<void> {
    return this.service.updatePassword(userId, body);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('/subscriptions')
  async getSubscriptions(@CurrentUserId() userId: string): Promise<PostType[]> {
    return this.service.getSubscriptions(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Put('/subscriptions')
  async updateSubscriptions(
    @CurrentUserId() userId: string,
    @Body() body: { types: PostType[] }
  ): Promise<PostType[]> {
    return this.service.updateSubscriptions(userId, body.types);
  }
}
