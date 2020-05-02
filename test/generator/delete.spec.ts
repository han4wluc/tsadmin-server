import { getRepository, getConnection } from 'typeorm';
import * as request from 'supertest';
import { assert } from 'chai';
import 'mocha';
import { connect } from 'test/db';

import { createApp } from 'test/express';
import { User, userAdminColumns } from 'test/entity/User';
import generator from '~/generator';
import { entitiesMap } from 'test/entity';

describe('updateOne', () => {
  this.app = undefined;
  beforeEach(async () => {
    await connect();
    this.app = await createApp();
    this.repository = getRepository(User);
    const user = new User({
      firstName: 'aaa',
      lastName: 'bbb',
      age: 9,
    });
    await this.repository.save(user);
  });

  afterEach(() => {
    return getConnection().close();
  });

  it('should update one user', async () => {
    const repository = getRepository(User);
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            delete: {
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
      .delete(`/users/${user.id}`)
      .expect(200)
      .then(async () => {
        const newUser = await repository.findOne(user.id);
        assert.equal(newUser, undefined);
      });
  });
});
