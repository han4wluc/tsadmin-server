import { createConnection } from 'typeorm';

import { createApp } from '~/express';
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
  generator(app, config);
  app.listen(8000);
  console.log(
    'Express server has started on port 8000. Open http://localhost:8000/users to see results',
  );
};

main()
  .then(() => {
    console.log('started');
  })
  .catch(() => {
    console.log('error');
  });
