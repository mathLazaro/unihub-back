import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.model';
import { Repository, In, ILike } from 'typeorm';
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

  async findFeed(offset: number, limit: number, types?: string[], searchQuery?: string, authorId?: string): Promise<[Post[], number]> {
    let typeCondition: any = types && types.length > 0 ? { type: In(types) as any } : {};
    
    if (authorId) {
      typeCondition = { ...typeCondition, author: { id: authorId } };
    }
    
    let whereCondition: any = typeCondition;
    
    if (searchQuery) {
      whereCondition = [
        { title: ILike(`%${searchQuery}%`), ...typeCondition },
        { content: ILike(`%${searchQuery}%`), ...typeCondition }
      ];
    }

    return await this.repository.findAndCount({
      where: whereCondition,
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        author: true
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
