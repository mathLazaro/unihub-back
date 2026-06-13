import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ViewPostDto } from '../dtos/view-post.dto';
import { Post } from '../entities/post.model';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { PostRepository } from '../repositories/post.repository';


@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly userRepository: UserRepository,
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

    return new ViewPostDto(await this.repository.save(post));
  }
}
