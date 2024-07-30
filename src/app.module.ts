import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SensorDataModule } from 'src/sensor-data/sensor-data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ortvest:3LSwOTBneuHggpov@ortvest-core.yxuddrs.mongodb.net/',
    ),
    SensorDataModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
