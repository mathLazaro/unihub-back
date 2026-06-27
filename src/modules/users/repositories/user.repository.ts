import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.model";
import { BaseRepository } from "@shared/core/base.repository";
import { PostType } from "@root/modules/posts/enums/post-type.enum";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  async findAllUsersToNotificate(postType: PostType): Promise<User[]>{
    return await this.repository
        .createQueryBuilder('user')
        .where('user.subscribedTypes LIKE :postType', { postType: `%${postType}%` })
        .getMany();
  }

}
