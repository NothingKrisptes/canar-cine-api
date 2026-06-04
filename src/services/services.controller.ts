import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { DescuentosDto } from './dto/descuento.dto';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post('descuentos')
    calcularDescuentos(@Body() descuentosDto: DescuentosDto) {
        return this.servicesService.descuentos(descuentosDto);
    }
    @Get('salas')
    clases(@Query('asientos_disponibles') asientos_disponibles: number, @Query('capacidades') capacidades: string) {
        return this.servicesService.clases(asientos_disponibles, capacidades);
    }
}
