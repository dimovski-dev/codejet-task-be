import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SensorDataDocument = HydratedDocument<SensorData>;

@Schema()
export class SensorData {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);
