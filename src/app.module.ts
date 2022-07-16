import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { environments } from './environments';
import { envSchema } from './config/envSchema.config';
import { AuthModule } from './auth/auth.module';
import config from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: envSchema,
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
