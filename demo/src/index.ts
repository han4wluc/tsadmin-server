import { createConnection, getRepository } from 'typeorm';
import * as express from 'express';
import generator from 'tsadmin';

import { User, userAdminColumns } from './entities/User';
import { Company, companyAdminColumns } from './entities/Company';

const AUTH_TOKEN = 'demo';

const main = async (): Promise<any> => {
  await createConnection({
    type: 'sqlite',
    database: 'db/demo.sqlite',
    synchronize: true,
    entities: [User, Company],
  });
  const app = express();
  const config = {
    models: [
      {
        id: 0,
        label: 'users',
        entity: 'User',
        routes: {
          create: {
            enabled: true,
          },
          getMany: {
            enabled: true,
          },
          getOne: {
            enabled: true,
          },
          updateOne: {
            enabled: true,
          },
          delete: {
            enabled: true,
          },
        },
        columns: userAdminColumns,
        relations: ['company'],
      },
      {
        id: 1,
        label: 'company',
        entity: 'Company',
        routes: {
          create: {
            enabled: true,
          },
          getMany: {
            enabled: true,
          },
          getOne: {
            enabled: true,
          },
          updateOne: {
            enabled: true,
          },
          delete: {
            enabled: true,
          },
        },
        columns: companyAdminColumns,
      },
    ],
  };

  app.use(
    '',
    generator(
      config,
      {
        User,
        Company,
      },
      getRepository,
      AUTH_TOKEN,
    ),
  );
  app.listen(8002);
  console.log('Express server has started on port 8002');
};

main()
  .then(() => {
    console.log('started');
  })
  .catch((err: any) => {
    console.log('error', err);
  });
