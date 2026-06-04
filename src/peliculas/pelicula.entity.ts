import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Genero } from '../generos/genero.entity';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Genero, (genero) => genero.peliculas, { eager: true, onDelete: 'RESTRICT' })
  genero?: Genero;

  @Column()
  titulo?: string;

  @Column({ unique: true })
  codigo?: string;

  @Column({ default: 0 })
  duracion_minutos?: number;

  @Column({ default: 0 })
  precio_entrada?: number;

  @Column({ default: true })
  estado_cartelera?: boolean;

}