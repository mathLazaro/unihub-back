import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Senha deve ser uma string' })
  senha: string;
}
