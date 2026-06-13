import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { ViewUserDto } from '../dtos/view-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.model';

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


  getHello(): string {
    return 'Hello World!';
  }

}
