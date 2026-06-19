import { Post } from "../../entities/post.model";
import { PostType } from "../../enums/post-type.enum";

export interface ViewFeedDto {
  id: string;
  content: string;
  author: { id: string, name: string }
  type: PostType;
  contactInfo?: string;
  location?: string;
  expiresAt?: string;
  createdAt?: string;
}
