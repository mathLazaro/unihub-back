import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @ApiProperty()
  @IsString()
  @MaxLength(14, { message: ' Documento deve ter 14 caracteres ' })
  documento: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  email: string;

  @ApiProperty()
  @IsString()
  senha: string;

  @ApiProperty({ example: '1917-3-8' })
  @IsString()
  nascimento: string;
}
