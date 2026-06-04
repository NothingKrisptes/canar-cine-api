import { IsArray, IsDecimal, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Decimal128 } from 'typeorm/browser/driver/mongodb/bson.typings.js';

export class PeliculaDescuentoDto {
  @IsOptional()
  @IsString()
  cliente?: string;

  @IsOptional()
  @IsNumber()
  precio_base?: number;

  @IsOptional()
  @IsString()
  tipo_cliente?: string;

  @IsOptional()
  @IsInt()
  asientos_disponibles?: number;

  @IsOptional()
  @IsString()
  capacidades?: string;
}

export class DescuentosDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PeliculaDescuentoDto)
  peliculas?: PeliculaDescuentoDto[];
}