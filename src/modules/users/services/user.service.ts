import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { ViewUserDto } from '../dtos/view-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.model';
import { PostType } from '@root/modules/posts/enums/post-type.enum';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) { }

  async create(user: CreateUserDto): Promise<ViewUserDto> {
    const hashPassword = await bcrypt.hash(user.senha, 8);
    user.senha = hashPassword;

    const userToSave = new User({
      ...user,
      senha: hashPassword,
    });

    return new ViewUserDto(await this.repository.save(userToSave));
  }


  async subscribeTag(tags: PostType[], userId: string): Promise<void> {
    const user = await this.repository.findByIdOrThrow(userId);
    user.subscribedTypes = tags;
    this.repository.save(user);
  }

}
