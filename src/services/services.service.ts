import { Injectable } from '@nestjs/common';
import { DescuentosDto } from './dto/descuento.dto';

@Injectable()
export class ServicesService {

  descuentos(descuentosDto: DescuentosDto) {
    let total_descuento = 0;
    const detalle: { nombre: string | undefined; descuento_pct: number; total_descuento: number; }[] = [];

    for (const pelicula of descuentosDto!.peliculas!) {
      let descuento_pct: number;

      if (pelicula.tipo_cliente === "GENERAL")          descuento_pct = 0;
      else if (pelicula!.tipo_cliente! === "ESTUDIANTE")             descuento_pct = 20;
      else if (pelicula!.tipo_cliente! === "TERCERA_EDAD")            descuento_pct = 30;
      else                                descuento_pct = 0;

      const descuento     = +(pelicula!.precio_base! * descuento_pct / 100).toFixed(2);
      const descuento_pelicula = +(pelicula!.precio_base! - descuento).toFixed(2);
      total_descuento       = +(total_descuento + descuento_pelicula).toFixed(2);

      detalle.push({
        nombre:      pelicula.cliente,
        descuento_pct,
        total_descuento: descuento_pelicula,
      });
    }

    return {
      total_peliculas: detalle.length,
      total_descuento,
      detalle,
    };
  }

  clases(asientos_disponibles: number, capacidades: string) {
    const lista = capacidades.split(',').map((d) => parseInt(d.trim(), 10));

    let acumulado = 0;
    let indice    = 0;
    const agendadas: number[] = [];

    while (indice < lista.length) {
      const capacidad_actual = lista[indice];

      if (acumulado + capacidad_actual <= asientos_disponibles) {
        acumulado += capacidad_actual;
        agendadas.push(capacidad_actual);
        indice++;
      } else {
        break; // no cabe: detener el ciclo de inmediato
      }
    }

    return {
      salas_agendadas: agendadas.length,
      asientos_libres:   asientos_disponibles - acumulado,
      detalle:          agendadas,
    };
  }

}