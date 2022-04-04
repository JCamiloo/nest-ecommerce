import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || 'dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
    })
  ],
})
export class AppModule {}
