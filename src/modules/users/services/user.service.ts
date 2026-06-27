import { Injectable, ConflictException } from '@nestjs/common';
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

    try {
      return new ViewUserDto(await this.repository.save(userToSave));
    } catch (error: any) {
      if (error.code === '23505') { // Postgres unique violation code
        if (error.detail.includes('email')) {
          throw new ConflictException('Este e-mail já está cadastrado.');
        } else if (error.detail.includes('documento')) {
          throw new ConflictException('Este documento já está cadastrado.');
        }
        throw new ConflictException('Dados duplicados.');
      }
      throw error;
    }
  }

  async getProfile(userId: string): Promise<ViewUserDto> {
    const user = await this.repository.findByIdOrThrow(userId);
    return new ViewUserDto(user);
  }

  async getPublicProfile(userId: string): Promise<ViewUserDto> {
    const user = await this.repository.findByIdOrThrow(userId);
    return new ViewUserDto(user);
  }

  async updateProfile(userId: string, data: any): Promise<ViewUserDto> {
    const user = await this.repository.findByIdOrThrow(userId);
    if (data.nome) user.nome = data.nome;
    if (data.universidade !== undefined) user.universidade = data.universidade;
    if (data.curso !== undefined) user.curso = data.curso;
    
    return new ViewUserDto(await this.repository.save(user));
  }

  async updatePassword(userId: string, data: any): Promise<void> {
    const user = await this.repository.findByIdOrThrow(userId);
    
    if (!(await bcrypt.compare(data.senhaAtual, user.senha))) {
      throw new Error('Senha atual incorreta'); // Em um app real usar UnauthorizedException
    }
    
    const hashPassword = await bcrypt.hash(data.novaSenha, 8);
    user.senha = hashPassword;
    await this.repository.save(user);
  }

  async getSubscriptions(userId: string): Promise<PostType[]> {
    const user = await this.repository.findByIdOrThrow(userId);
    return user.subscribedTypes || [];
  }

  async updateSubscriptions(userId: string, types: PostType[]): Promise<PostType[]> {
    const user = await this.repository.findByIdOrThrow(userId);
    user.subscribedTypes = types;
    await this.repository.save(user);
    return user.subscribedTypes || [];
  }

}
