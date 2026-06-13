import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.model";
import { PostController } from "./controllers/post.controller";
import { UserModule } from "../users/user.module";
import { PostService } from "./services/post.service";
import { PostRepository } from "./repositories/post.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService, PostRepository],
})
export class PostModule { }
