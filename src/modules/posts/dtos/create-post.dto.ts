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
  @IsString({ message: 'As informações de contato devem ser uma string' })
  contactInfo?: string;

  @ApiProperty({
    description: 'Localização do evento ou serviço (opcional)',
    example: 'Campus da Universidade, Sala 101',
  })
  @IsString({ message: 'A localização deve ser uma string' })
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
