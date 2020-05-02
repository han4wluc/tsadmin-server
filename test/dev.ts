import { createConnection, getRepository } from 'typeorm';
import { entitiesMap } from 'test/entity';

import { createApp } from 'test/express';
import generator from '~/generator';

const main = async (): Promise<any> => {
  await createConnection();
  const app = await createApp();
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
          updateOne: {
            enabled: true,
          },
          delete: {
            enabled: true,
          },
        },
      },
    ],
  };

  app.use('/api', generator(config, entitiesMap, getRepository));
  app.listen(8000);
  console.log(
    'Express server has started on port 8000. Open http://localhost:8000 to see results',
  );
};

main()
  .then(() => {
    console.log('started');
  })
  .catch((err: any) => {
    console.log('error', err);
  });
