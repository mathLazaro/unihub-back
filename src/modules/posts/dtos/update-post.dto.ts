import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdatePostDto {

  @ApiProperty({
    description: 'Conteúdo do post',
    example: 'Este é o conteúdo do meu primeiro post.',
  })
  @IsString({ message: 'O conteúdo deve ser uma string' })
  @IsNotEmpty({ message: 'O conteúdo do post é obrigatório' })
  @MaxLength(560, {
    message: 'O conteúdo do post deve ter no máximo 560 caracteres',
  })
  content: string;

  @ApiProperty({
    description: 'Informações de contato (opcional)',
    example: 'Email: contato@exemplo.com',
  })
  @IsString({ message: 'As informações de contato devem ser uma string' })
  contactInfo?: string;

  @ApiProperty({
    description: 'Localização do evento ou serviço (opcional)',
    example: 'Campus da Universidade, Sala 101',
  })
  @IsString({ message: 'A localização deve ser uma string' })
  location?: string;

  @ApiProperty({
    description: 'Data de expiração do post (opcional)',
    example: '2024-12-31',
  })
  expiresAt?: string;
}
