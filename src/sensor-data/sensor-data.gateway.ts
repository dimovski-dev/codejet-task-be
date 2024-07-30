import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SensorDataService } from './sensor-data.service';
import { SensorData } from '../schemas/sensor-data.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class SensorDataGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly sensorDataService: SensorDataService) {}

  @SubscribeMessage('sendData')
  async handleMessage(
    @MessageBody() data: { temperature: number; humidity: number },
  ): Promise<void> {
    const sensorData: SensorData = {
      temperature: data.temperature,
      humidity: data.humidity,
      timestamp: new Date(),
    };

    await this.sensorDataService.create(sensorData);
    this.server.emit('newData', sensorData);

    console.log(sensorData);
  }
}
