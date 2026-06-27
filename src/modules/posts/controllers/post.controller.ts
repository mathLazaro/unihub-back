import { Body, Controller, HttpCode, Post, Get, Put, Delete, UseGuards, Param, Query, UseInterceptors } from "@nestjs/common";
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CurrentUserId } from "@root/shared/decorators/current-user.decorator";
import { PostService } from "@root/modules/posts/services/post.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { ViewPostDto } from "../dtos/view-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto";
import { JwtGuard } from "@root/shared/guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('')
  @HttpCode(201)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async createPost(
    @CurrentUserId() userId: string,
    @Body() post: CreatePostDto
  ): Promise<ViewPostDto> {
    return await this.postService.createPost(post, userId);
  }

  @Get('feed')
  @HttpCode(200)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10000)
  async getFeed(
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
    @Query('types') types?: string,
    @Query('q') q?: string,
    @Query('authorId') authorId?: string,
  ) {
    const parsedTypes = types ? types.split(',') : undefined;
    return await this.postService.getFeed(offset, limit, parsedTypes, q, authorId);
  }

  @Get(':id')
  @HttpCode(200)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  async getPostById(@Param('id') id: string): Promise<ViewPostDto> {
    return await this.postService.getPostById(id);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async updatePost(
    @Param('id') id: string,
    @CurrentUserId() userId: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<ViewPostDto> {
    return await this.postService.updatePost(id, updatePostDto, userId);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async deletePost(
    @Param('id') id: string,
    @CurrentUserId() userId: string,
  ): Promise<void> {
    return await this.postService.deletePost(id, userId);
  }
}
