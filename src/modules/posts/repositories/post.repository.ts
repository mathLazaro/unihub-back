import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.model';
import { Repository } from 'typeorm';
import { BaseRepository } from '@shared/core/base.repository';

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
}
