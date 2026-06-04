import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, Min, IsNumber } from 'class-validator';

export class UpdatePeliculaDto {
  @IsOptional()
  @IsUUID()
  generoId?: string;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsNumber()
  duracion_minutos?: number;

  @IsOptional()
  @IsNumber()
  precio_entrada?: number;

  @IsOptional()
  @IsBoolean()
  estado_cartelera?: boolean;
}