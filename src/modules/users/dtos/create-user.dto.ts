import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { UserType } from '../enums/user-type.enum';

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
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  nascimento: string;

  @ApiProperty({ enum: UserType })
  @IsEnum(UserType, { message: 'Tipo de usuário inválido' })
  tipo: UserType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  universidade?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  curso?: string;
}
