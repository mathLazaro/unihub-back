import { Column, Entity } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BaseEntity } from '@shared/core/base.entity';
import { PostType } from '@root/modules/posts/enums/post-type.enum';
import { UserType } from '../enums/user-type.enum';

@Entity('users')
export class User extends BaseEntity {

  @Column()
  nome: string;

  @Column({ unique: true })
  documento: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'date' })
  nascimento: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.ESTUDANTE,
  })
  tipo: UserType;

  @Column({ nullable: true })
  universidade?: string;

  @Column({ nullable: true })
  curso?: string;

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
      this.tipo = anUser.tipo || UserType.ESTUDANTE;
      this.universidade = anUser.universidade;
      this.curso = anUser.curso;
    }
  }
}
