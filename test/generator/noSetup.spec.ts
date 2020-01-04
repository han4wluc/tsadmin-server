import 'mocha';
import * as request from 'supertest';

import { runMigrations, revertAllMigrations } from 'test/db';
import { createApp } from 'test/express';

describe('without setting up generators', () => {
  this.app = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = await createApp();
  });
  afterEach(revertAllMigrations);
  it('should return true', done => {
    request(this.app)
      .get('/users')
      .expect(404, done);
  });
});
