import { PartialType, PickType } from '@nestjs/mapped-types';

import { Mask } from '../mask.entity';

class CreateMaskDto extends PartialType(
  PickType(Mask, ['color', 'cost', 'size', 'user'] as const),
) {
  // Empty
}

export { CreateMaskDto };
