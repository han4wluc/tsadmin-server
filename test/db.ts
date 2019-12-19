import { createConnection, getConnection } from 'typeorm';

export const connect = (): Promise<any> => {
  return createConnection();
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
