import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, Min, IsNumber } from 'class-validator';

export class CreatePeliculaDto {
  @IsUUID()
  generoId?: string;

  @IsString()
  titulo?: string;

  @IsString()
  codigo?: string;

  @IsNumber()
  duracion_minutos?: number;

  @IsNumber()
  precio_entrada?: number;

  @IsBoolean()
  estado_cartelera?: boolean;
}