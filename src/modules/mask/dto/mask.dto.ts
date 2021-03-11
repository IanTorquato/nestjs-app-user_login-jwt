import { User } from 'src/modules/user/user.entity';

interface MaskDataCreate {
  color: string;
  cost: number;
  size: string;
  userId: User;
}

export { MaskDataCreate };
