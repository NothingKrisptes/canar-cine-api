import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './pelicula.entity';
import { Genero } from '../generos/genero.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepository: Repository<Pelicula>,

    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createPeliculaDto: CreatePeliculaDto) {
    const genero = await this.generoRepository.findOne({ where: { id: createPeliculaDto.generoId } });
    if (!genero) throw new NotFoundException('Genero no encontrado');

    const pelicula = this.peliculaRepository.create({
      titulo:           createPeliculaDto.titulo,
      codigo:           createPeliculaDto.codigo,
      duracion_minutos: createPeliculaDto.duracion_minutos,
      precio_entrada:   createPeliculaDto.precio_entrada,
      estado_cartelera: createPeliculaDto.estado_cartelera,
      genero,
    });
    return this.peliculaRepository.save(pelicula);
  }

  findAll() {
    return this.peliculaRepository.find();
  }

  async findOne(id: string) {
    const pelicula = await this.peliculaRepository.findOne({ where: { id } });
    if (!pelicula) throw new NotFoundException('Pelicula no encontrado');
    return pelicula;
  }

  async update(id: string, updatePeliculaDto: UpdatePeliculaDto) {
    const pelicula = await this.findOne(id);

    if (updatePeliculaDto.generoId) {
      const genero = await this.generoRepository.findOne({ where: { id: updatePeliculaDto.generoId } });
      if (!genero) throw new NotFoundException('Genero no encontrado');
      pelicula.genero = genero;
    }

    Object.assign(pelicula, updatePeliculaDto);
    return this.peliculaRepository.save(pelicula);
  }

  async remove(id: string) {
    const pelicula = await this.findOne(id);
    return this.peliculaRepository.remove(pelicula);
  }
}