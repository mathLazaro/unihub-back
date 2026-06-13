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
    }
  }
}
