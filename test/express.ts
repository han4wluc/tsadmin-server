import * as express from 'express';
import * as bodyParser from 'body-parser';

const createApp = (): any => {
  const app = express();
  app.use(bodyParser.json());
  return app;
};

export { createApp };
