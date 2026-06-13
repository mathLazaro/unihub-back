import { User } from '../entities/user.model';

export class ViewUserDto {
  id: string;

  nome: string;

  documento: string;

  email: string;

  senha: string;

  nascimento: string;

  constructor(anUser: User) {
    this.id = anUser.id;
    this.nome = anUser.nome;
    this.documento = anUser.documento;
    this.email = anUser.email;
    this.senha = anUser.senha;
    this.nascimento = anUser.nascimento;
  }
}
