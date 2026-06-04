import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateGeneroDto {
  @IsString()
  nombre?: string;

  @IsString()
  codigo?: string;
}