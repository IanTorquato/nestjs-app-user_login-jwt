import { ConnectionOptions } from 'typeorm';
import { resolve } from 'path';

const port = Number(process.env.TYPEORM_PORT);
const logging = process.env.TYPEORM_LOGGING === 'true' ? true : false;
const synchronize = process.env.TYPEORM_SYNCHRONIZE === 'true' ? true : false;

// const sync = !process.env.TYPEORM_SYNCHRONIZE;

// console.log(typeof sync);
// console.log(sync);

const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port,
  logging,
  synchronize,
  entities: [resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  // subscribers: ['src/database/subscribers/**/*.ts'],
};

export { databaseConfig };
