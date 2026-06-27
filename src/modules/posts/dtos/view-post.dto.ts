import { PostType } from '../enums/post-type.enum';
import { Post } from '../entities/post.model';

export class ViewPostDto {
  id: string;
  title: string;
  content: string;
  authorId: string;
  type: PostType;
  contactInfo?: string;
  location?: string;
  expiresAt?: string;
  createdAt: Date;
  author: { id: string; name: string };

  constructor(post?: Post) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.content = post.content;
      this.authorId = post.authorId;
      this.type = post.type;
      this.contactInfo = post.contactInfo;
      this.location = post.location;
      this.expiresAt = post.expiresAt;
      this.createdAt = post.createdAt;
      this.author = {
        id: post.author?.id,
        name: post.author?.nome,
      };
    }
  }
}
