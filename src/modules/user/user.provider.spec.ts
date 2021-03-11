import { Test, TestingModule } from '@nestjs/testing';
import { userProvider } from './user.provider';

describe('userProvider', () => {
  let provider: userProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [userProvider],
    }).compile();

    provider = module.get<userProvider>(userProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
