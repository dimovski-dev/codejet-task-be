import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SensorDataModule } from 'src/sensor-data/sensor-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    SensorDataModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
