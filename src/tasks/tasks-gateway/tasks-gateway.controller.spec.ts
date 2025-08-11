import { Test, TestingModule } from '@nestjs/testing';
import { TasksGatewayController } from './tasks-gateway.controller';

describe('TasksGatewayController', () => {
  let controller: TasksGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksGatewayController],
    }).compile();

    controller = module.get<TasksGatewayController>(TasksGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
