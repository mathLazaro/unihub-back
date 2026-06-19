import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { PostService } from "@root/modules/posts/services/post.service";
import { CurrentUserId } from "@root/shared/decorators/current-user.decorator";
import { PageResponseDto } from "@root/shared/dtos/page-response.dto";
import { JwtGuard } from "@root/shared/guards/auth.guard";
import { CreatePostDto } from "../dtos/create-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto";
import { ViewPostDto } from "../dtos/view-post.dto";
import { ViewFeedDto } from "../dtos/feed/view-feed.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get('feed')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async getFeed(
    @CurrentUserId() userId: string,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.postService.getFeed(userId, offset, limit);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obter post por ID' })
  async getPostById(@Param('id') postId: string): Promise<ViewPostDto> {
    return await this.postService.getPostById(postId);
  }

  @Get('user/:userId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obter todos os posts de um usuário' })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 0,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    example: 10,
  })
  async getAllPostsByUserId(
    @Param('userId') userId: string,

    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number,

    @Query('size', new DefaultValuePipe(10), ParseIntPipe)
    size: number,

    @Query('query')
    query?: string,
  ): Promise<PageResponseDto<ViewPostDto>> {
    return this.postService.getAllPostsByUserId(
      userId,
      page,
      size,
      query,
    );
  }

  @Post('')
  @HttpCode(201)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Criar novo post' })
  async createPost(
    @CurrentUserId() userId: string,
    @Body() post: CreatePostDto
  ): Promise<ViewFeedDto> {
    return await this.postService.createPost(post, userId);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar post por ID' })
  async updatePostById(
    @Param('id') postId: string,
    @CurrentUserId() userId: string,
    @Body() post: UpdatePostDto
  ): Promise<ViewPostDto> {
    return await this.postService.updatePostById(postId, post, userId);
  }

  @Delete(':id')
  @HttpCode(203)
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Deletar post por ID' })
  async deletePost(
    @Param('id') postId: string,
    @CurrentUserId() userId: string
  ): Promise<void> {
    await this.postService.deletePost(postId, userId);
  }

}
