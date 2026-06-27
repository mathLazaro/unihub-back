import { User } from '../entities/user.model';

export class ViewUserDto {
  id: string;

  nome: string;

  documento: string;

  email: string;

  nascimento: string;

  tipo: string;

  universidade?: string;

  curso?: string;

  constructor(anUser: User) {
    this.id = anUser.id;
    this.nome = anUser.nome;
    this.documento = anUser.documento;
    this.email = anUser.email;
    this.nascimento = anUser.nascimento;
    this.tipo = anUser.tipo;
    this.universidade = anUser.universidade;
    this.curso = anUser.curso;
  }
}
