import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { PostType } from '@root/modules/posts/enums/post-type.enum';
import { IsFutureDate } from '@root/shared/decorators/date-validator.decorator';

export class CreatePostDto {

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
  @MaxLength(100, {
    message: 'As informações de contato devem ter no máximo 100 caracteres',
  })
  contactInfo?: string;

  @ApiProperty({
    description: 'Localização do evento ou serviço (opcional)',
    example: 'Campus da Universidade, Sala 101',
  })
  @MaxLength(150, {
    message: 'A localização deve ter no máximo 150 caracteres',
  })
  location?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Data de expiração do post (opcional)',
    example: '2024-12-31',
  })
  @IsFutureDate({ message: 'A data de expiração deve ser uma data futura' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data de expiração deve estar no formato YYYY-MM-DD' })
  @IsDateString()
  expiresAt?: string;
}
