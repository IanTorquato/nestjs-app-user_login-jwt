import { Test, TestingModule } from '@nestjs/testing';
import { tokenProvider } from './token.provider';

describe('Token', () => {
  let provider: tokenProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [tokenProvider],
    }).compile();

    provider = module.get<tokenProvider>(tokenProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
