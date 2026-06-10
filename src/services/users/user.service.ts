import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../models/users/dtos/create-user.dto';
import { User } from '../../models/users/entities/user.model';
import { ViewUserDto } from '../../models/users/dtos/view-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/users/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(user: CreateUserDto): Promise<ViewUserDto>{
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
