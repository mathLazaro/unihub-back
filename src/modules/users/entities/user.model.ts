import { Column, Entity } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BaseEntity } from '@shared/core/base.entity';
import { PostType } from '@root/modules/posts/enums/post-type.enum';

@Entity('users')
export class User extends BaseEntity {

  @Column()
  nome: string;

  @Column()
  documento: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'date' })
  nascimento: string;

  @Column({
    type: 'simple-array',
    nullable: true,
    default: null,
  })
  subscribedTypes: PostType[];

  constructor(anUser?: CreateUserDto) {
    super();
    if (anUser) {
      this.nome = anUser.nome;
      this.documento = anUser.documento;
      this.email = anUser.email;
      this.senha = anUser.senha;
      this.nascimento = anUser.nascimento;
    }
  }
}
