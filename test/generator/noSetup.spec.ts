import 'mocha';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { createApp } from '~/express';
import { User } from '~/entity/User';

describe('without setting up generators', () => {
  this.app = undefined;
  beforeEach(async () => {
    this.app = await createApp();
    const repository = getRepository(User);
    await repository.query(`DELETE FROM user;`);
  });
  it('should return true', done => {
    request(this.app)
      .get('/users')
      .expect(404, done);
  });
});
