import * as request from 'supertest';
import { assert } from 'chai';
import 'mocha';
import { getRepository, getConnection } from 'typeorm';
import { connect } from 'test/db';
import { createApp } from 'test/express';
import { User, userAdminColumns } from 'test/entity/User';
import generator from '~/generator';
import { entitiesMap } from 'test/entity';

describe('create generator', () => {
  this.app = undefined;
  this.repository = undefined;
  beforeEach(async () => {
    await connect();
    this.app = createApp();
    this.repository = getRepository(User);
  });

  afterEach(() => {
    return getConnection().close();
  });

  context('with auth token', () => {
    beforeEach(async () => {
      const config = {
        models: [],
      };
      this.app.use(generator(config, entitiesMap, getRepository, 'xxxx'));
    });

    it('should return 401', () => {
      return request(this.app)
        .get('/entities')
        .send()
        .expect(401);
    });

    it('should return 401', () => {
      return request(this.app)
        .post('/authorize')
        .send()
        .expect(401);
    });

    it('should return 200', () => {
      return request(this.app)
        .post('/authorize')
        .set('Authorization', 'Bearer xxxx')
        .send()
        .expect(200);
    });
  });

  context('without auth token', () => {
    beforeEach(async () => {
      const config = {
        models: [],
      };
      this.app.use(generator(config, entitiesMap, getRepository));
    });

    it('should return 200', () => {
      return request(this.app)
        .get('/entities')
        .send()
        .expect(200);
    });

    it('should return 200', () => {
      return request(this.app)
        .post('/authorize')
        .send()
        .expect(200);
    });
  });
});
