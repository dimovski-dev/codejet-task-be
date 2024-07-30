import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';

export class CreateSensorDataDto {
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  humidity: number;

  @IsDate()
  @IsNotEmpty()
  timestamp: Date;
}
