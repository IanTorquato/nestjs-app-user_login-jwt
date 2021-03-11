import { User } from 'src/user/user.entity';

interface MaskDataCreate {
  color: string;
  cost: number;
  size: string;
  userId: User;
}

export { MaskDataCreate };
