import { createConnection, getConnection } from 'typeorm';
import { User } from './entity/User';

export const connect = (): Promise<any> => {
  return createConnection({
    type: 'postgres',
    synchronize: true,
    dropSchema: true,
    username: 'postgres',
    password: 'postgres',
    database: 'tsadmintest',
    entities: [User],
  });
};

const hasUnrevertedMigrations = async (): Promise<any> => {
  const r = await getConnection().query('show tables;');
  const tables = r.filter((t: any) => t.Tables_in_ut !== 'migrations');
  const res = tables.length > 0;
  return Boolean(res);
};

export const revertAllMigrations = async (): Promise<any> => {
  while (await hasUnrevertedMigrations()) {
    await getConnection().undoLastMigration({
      transaction: 'all',
    });
  }
};

export const runMigrations = async (): Promise<any> => {
  await revertAllMigrations();
  return getConnection().runMigrations({
    transaction: 'all',
  });
};
