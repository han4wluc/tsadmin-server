import 'mocha';
import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { connect } from 'test/db';
import { createApp } from 'test/express';

describe('without setting up generators', () => {
  this.app = undefined;
  beforeEach(async () => {
    await connect();
    this.app = await createApp();
  });
  afterEach(() => {
    return getConnection().close();
  });
  it('should return true', done => {
    request(this.app)
      .get('/users')
      .expect(404, done);
  });
});
