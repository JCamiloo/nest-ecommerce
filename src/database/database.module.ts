import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config/env.config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({...configService.postgres});
        client.connect().then(() => console.log('DATABASE CONNECTED'));

        return client;
      }
    }
  ],
  exports: ['PG']
})
export class DatabaseModule {}
