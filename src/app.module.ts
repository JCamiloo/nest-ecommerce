import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
      isGlobal: true
    })
  ],
})
export class AppModule {}
