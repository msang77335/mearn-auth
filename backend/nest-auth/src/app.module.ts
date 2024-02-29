import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { BaseModule } from './base';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    AuthModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
