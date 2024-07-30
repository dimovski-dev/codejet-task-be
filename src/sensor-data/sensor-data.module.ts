import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorData, SensorDataSchema } from 'src/schemas/sensor-data.schema';
import { SensorDataGateway } from 'src/sensor-data/sensor-data.gateway';
import { SensorDataService } from 'src/sensor-data/sensor-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorData.name, schema: SensorDataSchema },
    ]),
  ],
  controllers: [],
  providers: [SensorDataGateway, SensorDataService],
})
export class SensorDataModule {}
