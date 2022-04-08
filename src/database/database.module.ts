import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from '../config/env.config';
import { Product } from '../products/entities/product.entity';
import { Category } from '../products/entities/category.entity';
import { Brand } from '../products/entities/brand.entity';
import { Customer } from '../users/entities/customer.entity';
import { User } from '../users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.database;

        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          entities: [Product, Category, Brand, Customer, User],
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.database;

        const client = new Client({
          user,
          host,
          database: name,
          password,
          port,
        });

        client.connect().then(() => console.log('DATABASE CONNECTED'));

        return client;
      },
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
