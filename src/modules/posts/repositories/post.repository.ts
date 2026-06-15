import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.model';
import { Repository } from 'typeorm';
import { BaseRepository } from '@shared/core/base.repository';
import { PageResponseDto } from '@root/shared/dtos/page-response.dto';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectRepository(Post)
    protected readonly repository: Repository<Post>,
  ) {
    super(repository);
  }

  async save(post: Post): Promise<Post> {
    return await this.repository.save(post);
  }

  async findByAuthorId(
    authorId: string,
    page = 0,
    size = 10,
    query?: string
  ): Promise<PageResponseDto<Post>> {
    const skip = page * size;
    const take = size;

    const where: any = { authorId };

    if (query) {
      where.title = `%${query}%`;
      where.content = `%${query}%`;
    }

    const [posts, total] = await this.repository.findAndCount({
      ...where,
      skip,
      take
    });

    return new PageResponseDto(posts, total, page, size);

  }
}
