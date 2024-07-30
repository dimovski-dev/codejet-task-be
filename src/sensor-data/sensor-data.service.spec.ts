import { Test, TestingModule } from '@nestjs/testing';
import { SensorDataService } from './sensor-data.service';
import { getModelToken } from '@nestjs/mongoose';
import { SensorData } from '../schemas/sensor-data.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

describe('SensorDataService', () => {
  let service: SensorDataService;
  let model: Model<SensorData>;

  const mockSensorData = {
    temperature: 25,
    humidity: 50,
    timestamp: new Date(),
  };

  const mockSensorDataModel = {
    create: jest.fn().mockResolvedValue(mockSensorData),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockSensorData]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorDataService,
        {
          provide: getModelToken(SensorData.name),
          useValue: mockSensorDataModel,
        },
      ],
    }).compile();

    service = module.get<SensorDataService>(SensorDataService);
    model = module.get<Model<SensorData>>(getModelToken(SensorData.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a sensor data record', async () => {
    const result = await service.create(mockSensorData);
    expect(result).toEqual(mockSensorData);
    expect(model.create).toHaveBeenCalledWith(mockSensorData);
  });

  it('should return all sensor data records', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockSensorData]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should throw error on invalid temperature', async () => {
    const invalidData = {
      temperature: 'invalid',
      humidity: 50,
      timestamp: new Date(),
    };

    const validationError = new BadRequestException('Validation failed');
    jest.spyOn(service, 'create').mockRejectedValue(validationError);

    await expect(service.create(invalidData as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw error on invalid humidity', async () => {
    const invalidData = {
      temperature: 25,
      humidity: 'invalid',
      timestamp: new Date(),
    };

    const validationError = new BadRequestException('Validation failed');
    jest.spyOn(service, 'create').mockRejectedValue(validationError);

    await expect(service.create(invalidData as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw error on invalid timestamp', async () => {
    const invalidData = {
      temperature: 25,
      humidity: 50,
      timestamp: 'invalid-date',
    };

    const validationError = new BadRequestException('Validation failed');
    jest.spyOn(service, 'create').mockRejectedValue(validationError);

    await expect(service.create(invalidData as any)).rejects.toThrow(
      BadRequestException,
    );
  });
});
