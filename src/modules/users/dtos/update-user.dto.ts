import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  universidade?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  curso?: string;
}
