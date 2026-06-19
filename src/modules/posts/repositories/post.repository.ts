import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.model';
import { Repository } from 'typeorm';
import { BaseRepository } from '@shared/core/base.repository';
import { PageResponseDto } from '@root/shared/dtos/page-response.dto';
import { FeedParams } from '../dtos/feed/feed-params-request';
import { ViewFeedWrapperResponse } from '../dtos/feed/feed-wrapper-response';
import { ViewFeedDto } from '../dtos/feed/view-feed.dto';

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

  private generateSeed(userId: string): string {
    const today = new Date().toISOString().split('T')[0];
    return `${userId}-${today}`;
  }

  async getFeed({ userId, offset, limit }: FeedParams): Promise<ViewFeedWrapperResponse> {
    const seed = this.generateSeed(userId);

    const posts = await this.repository.query(
      `
        SELECT
          post.*,
          author.id as "author_id",
          author.nome as "author_name"
        FROM posts post
        LEFT JOIN users author ON author.id = post.author_id
        WHERE post.expires_at IS NULL OR post.expires_at > NOW()
        ORDER BY md5(post.id::text || $1)
        LIMIT $2 OFFSET $3
    `,
      [seed, limit, offset]
    );

    const data = posts.map((post: any) => ({
      id: post.id,
      content: post.content,
      author: {
        id: post.author_id,
        name: post.author_name
      },
      type: post.type,
      contactInfo: post.contact_info,
      location: post.location,
      expiresAt: post.expires_at,
      createdAt: post.created_at
    } as ViewFeedDto));
    const next_offset = offset + limit;
    const has_more = posts.length === limit;

    return { data, next_offset, has_more, seed };
  }
}
