import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsPastDate } from '../../../shared/decorators/date-validator.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @ApiProperty()
  @IsString()
  @MaxLength(14, { message: 'Documento deve ter no máximo 14 caracteres' })
  documento: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  email: string;

  @ApiProperty()
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  senha: string;

  @ApiProperty({ example: '1917-03-08' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data de expiração deve estar no formato YYYY-MM-DD' })
  @IsDateString({ strict: true }, { message: 'Data de nascimento deve ser uma data válida' })
  @IsPastDate({ message: 'A data de nascimento deve ser uma data passada' })
  nascimento: string;
}
