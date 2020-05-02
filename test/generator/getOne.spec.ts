import * as request from 'supertest';
import 'mocha';
import { assert } from 'chai';
import { getRepository, getConnection } from 'typeorm';
import { connect } from 'test/db';
import { createApp } from 'test/express';
import { User, userAdminColumns } from 'test/entity/User';
import generator from '~/generator';
import loadFixtures from 'test/fixtures';

import { entitiesMap } from 'test/entity';

describe('generator getAll', () => {
  this.app = undefined;
  beforeEach(async () => {
    await connect();
    this.app = await createApp();
    await loadFixtures('test/fixtures');
  });
  afterEach(() => {
    return getConnection().close();
  });
  it('should return one users', async () => {
    const repository = getRepository(User);
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            getOne: {
              enabled: true,
            },
          },
          columns: userAdminColumns,
        },
      ],
    };

    const user = await repository.findOne();

    this.app.use(generator(config, entitiesMap, getRepository));
    return request(this.app)
      .get(`/users/${user.id}`)
      .expect(200)
      .then(response => {
        assert.equal(response.body.firstName, user.firstName);
      });
  });

  it('should return one users', async () => {
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            getOne: {
              enabled: true,
            },
          },
        },
      ],
    };

    this.app.use(generator(config, entitiesMap, getRepository));
    return request(this.app)
      .get(`/users/99999999`)
      .expect(404);
  });
});
