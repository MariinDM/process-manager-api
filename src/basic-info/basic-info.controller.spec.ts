import { Test, TestingModule } from '@nestjs/testing';
import { BasicInfoController } from './basic-info.controller';
import { BasicInfoService } from './basic-info.service';

describe('BasicInfoController', () => {
  let controller: BasicInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicInfoController],
      providers: [BasicInfoService],
    }).compile();

    controller = module.get<BasicInfoController>(BasicInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
