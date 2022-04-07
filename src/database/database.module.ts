import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from '../config/env.config';
import { Product } from '../products/entities/product.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          ...configService.database,
          type: 'postgres',
          username: configService.database.user,
          database: configService.database.name,
          synchronize: true,
          autoLoadEntities: true,
          entities: [Product]
        }
      }
    })
  ],
  providers: [
    {
      provide: 'PG',
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          ...configService.database,
          database: configService.database.name,
        });

        client.connect().then(() => console.log('DATABASE CONNECTED'));

        return client;
      }
    }
  ],
  exports: ['PG', TypeOrmModule]
})
export class DatabaseModule {}
