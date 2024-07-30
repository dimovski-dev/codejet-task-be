import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorData, SensorDataDocument } from '../schemas/sensor-data.schema';
import { CreateSensorDataDto } from 'src/sensor-data/create-sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectModel(SensorData.name)
    private sensorDataModel: Model<SensorDataDocument>,
  ) {}

  async create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const createdSensorData = await this.sensorDataModel.create(
      createSensorDataDto,
    );
    return createdSensorData;
  }

  async findAll(): Promise<SensorData[]> {
    return this.sensorDataModel.find().exec();
  }
}
