import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { CurrentUserId } from "@root/shared/decorators/current-user.decorator";
import { PostService } from "@root/modules/posts/services/post.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { ViewPostDto } from "../dtos/view-post.dto";
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

}
