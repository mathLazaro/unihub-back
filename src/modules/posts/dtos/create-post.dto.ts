import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PostType } from '@root/modules/posts/enums/post-type.enum';

export class CreatePostDto {
  @ApiProperty({ description: 'Título do post', example: 'Meu primeiro post' })
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título do post é obrigatório' })
  @MaxLength(100, {
    message: 'O título do post deve ter no máximo 100 caracteres',
  })
  title: string;

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
    description: 'Tipo do post',
    example: 'INFO',
    enum: PostType,
  })
  @IsEnum(PostType, { message: 'O tipo do post deve ser um valor válido' })
  type: PostType;

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
  @IsString()
  expiresAt?: string;
}
