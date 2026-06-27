import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A senha atual é obrigatória' })
  senhaAtual: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A nova senha é obrigatória' })
  @MinLength(8, { message: 'A nova senha deve ter no mínimo 8 caracteres' })
  novaSenha: string;
}
