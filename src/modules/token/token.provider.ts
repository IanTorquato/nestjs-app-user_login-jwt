import { Connection } from 'typeorm';

import { Token } from './token.entity';

export const tokenProvider = [
  {
    provide: 'TOKEN_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Token),
    inject: ['DATABASE_CONNECTION'],
  },
];
