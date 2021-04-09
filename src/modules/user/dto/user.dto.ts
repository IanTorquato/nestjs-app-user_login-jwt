import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

import { User } from '../user.entity';

class CreateUserDto extends PartialType(
  PickType(User, ['name', 'email', 'password'] as const),
) {
  // Empty
}

class FindUserDto extends PartialType(OmitType(User, ['password'] as const)) {
  // Empty
}

class LoginUserDto extends PartialType(
  PickType(User, ['email', 'password'] as const),
) {
  // Empty
}

class LoginResponse {
  access_token: string;
}

export { CreateUserDto, FindUserDto, LoginUserDto, LoginResponse };
