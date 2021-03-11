import { Test, TestingModule } from '@nestjs/testing';
import { maskProvider } from './mask.provider';

describe('Mask', () => {
  let provider: maskProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [maskProvider],
    }).compile();

    provider = module.get<maskProvider>(maskProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
