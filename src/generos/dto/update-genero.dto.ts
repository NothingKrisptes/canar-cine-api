import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateGeneroDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  codigo?: string;
}