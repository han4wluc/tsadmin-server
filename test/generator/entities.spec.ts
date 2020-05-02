import 'mocha';
import { assert } from 'chai';
import * as request from 'supertest';
import { getRepository, getConnection } from 'typeorm';

import { connect } from 'test/db';
import { createApp } from 'test/express';
import { User, userAdminColumns } from 'test/entity/User';
import generator from '~/generator';
import { entitiesMap } from 'test/entity';

describe('get entities', () => {
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
  it('should return columns', () => {
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            create: {
              enabled: true,
            },
          },
          columns: userAdminColumns,
        },
      ],
    };

    this.app.use(generator(config, entitiesMap, getRepository));

    return request(this.app)
      .get('/entities')
      .expect(200)
      .then(async response => {
        assert.equal(response.body.entities.length, 1);
        assert.deepEqual(response.body.entities[0].columns, userAdminColumns);
      });
  });
});
