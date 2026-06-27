import { PostType } from '../enums/post-type.enum';
import { User } from '@root/modules/users/entities/user.model';

import { Entity, Column, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { BaseEntity } from '@shared/core/base.entity';

@Entity('posts')
export class Post extends BaseEntity {

  @Column({
    length: 150,
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @RelationId((post: Post) => post.author)
  authorId: string;

  @Column({
    type: 'enum',
    enum: PostType,
  })
  type: PostType;

  @Column({
    name: 'contact_info',
    nullable: true,
  })
  contactInfo?: string;

  @Column({
    nullable: true,
  })
  location?: string;

  @Column({
    name: 'expires_at',
    type: 'date',
    nullable: true,
  })
  expiresAt?: string;


  @ManyToOne(() => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  constructor(createPost?: CreatePostDto) {
    super();
    if (createPost) {
      this.title = createPost.title;
      this.content = createPost.content;
      this.type = createPost.type;
      this.contactInfo = createPost.contactInfo;
      this.location = createPost.location;
      this.expiresAt = createPost.expiresAt;
    }
  }
}
