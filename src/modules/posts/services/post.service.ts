import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ViewPostDto } from '../dtos/view-post.dto';
import { Post } from '../entities/post.model';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { PostRepository } from '../repositories/post.repository';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PageResponseDto } from '@root/shared/dtos/page-response.dto';
import { ViewFeedWrapperResponse } from '../dtos/feed/feed-wrapper-response';


@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async getPostById(postId: string): Promise<ViewPostDto> {
    if (!postId) {
      throw new BadRequestException('ID do post é obrigatório');
    }

    const post = await this.repository.findByIdOrThrow(postId);

    return new ViewPostDto(post);
  }

  async getAllPostsByUserId(
    userId: string,
    page: number = 0,
    size: number = 10,
    query?: string
  ): Promise<PageResponseDto<ViewPostDto>> {
    if (!userId) {
      throw new BadRequestException('ID do usuário é obrigatório');
    }

    const user = await this.userRepository.findByIdOrThrow(userId);
    const posts = await this.repository.findByAuthorId(user.id, page, size, query);

    return new PageResponseDto(
      posts.data.map(post => new ViewPostDto(post)),
      posts.total,
      posts.page,
      posts.size
    );
  }

  async createPost(
    postToSave: CreatePostDto,
    userId: string,
  ): Promise<ViewPostDto> {
    if (!postToSave) {
      throw new BadRequestException('Dados obrigatórios não fornecidos');
    }

    const post = new Post(postToSave);
    post.author = await this.userRepository.findByIdOrThrow(userId);

    return new ViewPostDto(await this.repository.save(post));
  }

  async updatePostById(
    postId: string,
    postToUpdate: UpdatePostDto,
    userId: string
  ): Promise<ViewPostDto> {
    if (!postToUpdate) {
      throw new BadRequestException('Dados obrigatórios não fornecidos');
    }
    if (!postId) {
      throw new BadRequestException('ID do post é obrigatório');
    }

    const post = await this.repository.findByIdOrThrow(postId);

    if (post.authorId !== userId) {
      throw new ForbiddenException('Usuário não autorizado a acessar este post');
    }

    Object.assign(post, postToUpdate);

    return new ViewPostDto(await this.repository.save(post));
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    if (!postId) {
      throw new BadRequestException('ID do post é obrigatório');
    }

    const post = await this.repository.findByIdOrThrow(postId);

    if (post.authorId !== userId) {
      throw new ForbiddenException('Usuário não autorizado a excluir este post');
    }

    await this.repository.softDelete(postId);
  }

  async getFeed(userId: string, offset: number, limit: number): Promise<ViewFeedWrapperResponse> {
    return this.repository.getFeed({ userId, offset, limit });
  }

}
