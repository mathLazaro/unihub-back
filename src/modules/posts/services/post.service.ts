import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ViewPostDto } from '../dtos/view-post.dto';
import { Post } from '../entities/post.model';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { PostRepository } from '../repositories/post.repository';
import { NotificationService } from '@root/modules/notification/service/notification.service';


@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService
  ) { }

  async createPost(
    postToSave: CreatePostDto,
    userId: string,
  ): Promise<ViewPostDto> {
    if (!postToSave) {
      throw new BadRequestException('Dados obrigatórios não fornecidos');
    }

    const now = new Date().getTime();
    const expiresAt = postToSave.expiresAt ? new Date(postToSave.expiresAt).getTime() : null;
    if (expiresAt && expiresAt <= now) {
      throw new BadRequestException('A data de expiração deve ser no futuro');
    }

    const post = new Post(postToSave);
    post.author = await this.userRepository.findByIdOrThrow(userId);

    await this.notificationService.create(post.type);

    return new ViewPostDto(await this.repository.save(post));
  }

  async getFeed(offset: number, limit: number, types?: string[], searchQuery?: string, authorId?: string) {
    const [posts, total] = await this.repository.findFeed(offset, limit, types, searchQuery, authorId);
    return {
      data: posts.map(post => new ViewPostDto(post)),
      total,
      offset,
      limit,
    };
  }

  async getPostById(id: string): Promise<ViewPostDto> {
    const post = await this.repository.findByIdOrThrow(id);
    return new ViewPostDto(post);
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<ViewPostDto> {
    const post = await this.repository.findByIdOrThrow(id);
    if (post.authorId !== userId) {
      throw new BadRequestException('Você só pode editar seus próprios posts');
    }

    if (updatePostDto.title) post.title = updatePostDto.title;
    if (updatePostDto.content) post.content = updatePostDto.content;
    if (updatePostDto.type) post.type = updatePostDto.type;
    if (updatePostDto.contactInfo) post.contactInfo = updatePostDto.contactInfo;
    if (updatePostDto.location) post.location = updatePostDto.location;
    if (updatePostDto.expiresAt) post.expiresAt = updatePostDto.expiresAt;

    return new ViewPostDto(await this.repository.save(post));
  }

  async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.repository.findByIdOrThrow(id);
    if (post.authorId !== userId) {
      throw new BadRequestException('Você só pode excluir seus próprios posts');
    }
    await this.repository.delete(id);
  }
}
