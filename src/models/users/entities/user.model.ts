import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { randomUUID } from 'crypto';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  documento: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  nascimento: Date;

  constructor (anUser?: CreateUserDto){
    this.id = randomUUID();
    if(anUser) {
      this.nome = anUser.nome;
      this.documento = anUser.documento;
      this.email = anUser.email;
      this.senha = anUser.senha;
      this.nascimento = anUser.nascimento;
    }
  }
}