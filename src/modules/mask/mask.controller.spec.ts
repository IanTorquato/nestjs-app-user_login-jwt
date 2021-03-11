import { Test, TestingModule } from '@nestjs/testing';
import { MaskController } from './mask.controller';

describe('MaskController', () => {
  let controller: MaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaskController],
    }).compile();

    controller = module.get<MaskController>(MaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
