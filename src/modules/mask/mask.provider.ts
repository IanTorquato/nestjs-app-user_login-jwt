import { Connection } from 'typeorm';

import { Mask } from './mask.entity';

export const maskProvider = [
  {
    provide: 'MASK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Mask),
    inject: ['DATABASE_CONNECTION'],
  },
];
