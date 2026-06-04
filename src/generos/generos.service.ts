import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './genero.entity';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  create(createGeneroDto: CreateGeneroDto) {
    const genero = this.generoRepository.create(createGeneroDto);
    return this.generoRepository.save(genero);
  }

  findAll() {
    return this.generoRepository.find({ relations: { peliculas: true } });
  }

  async findOne(id: string) {
    const genero = await this.generoRepository.findOne({ where: { id }, relations: { peliculas: true } });
    if (!genero) throw new NotFoundException('Genero no encontrado');
    return genero;
  }

  async update(id: string, updateGeneroDto: UpdateGeneroDto) {
    const genero = await this.findOne(id);
    Object.assign(genero, updateGeneroDto);
    return this.generoRepository.save(genero);
  }

  async remove(id: string) {
    const genero = await this.generoRepository.findOne({ where: { id }, relations: { peliculas: true } });
    if (!genero) throw new NotFoundException('Genero no encontrado');
    if (genero.peliculas && genero.peliculas.length > 0)
      throw new BadRequestException('No se puede eliminar un genero con peliculas activos');
    return this.generoRepository.remove(genero);
  }
}