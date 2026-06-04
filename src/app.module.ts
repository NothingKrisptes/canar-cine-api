import { Module } from '@nestjs/common';
import { GenerosModule } from './generos/generos.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { StaffsModule } from './staffs/staffs.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GenerosModule,
    PeliculasModule,
    StaffsModule,
  ],
})
export class AppModule {}
