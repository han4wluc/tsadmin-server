import { getRepository, getConnection } from 'typeorm';
import { assert } from 'chai';
import 'mocha';
import * as request from 'supertest';

import { connect } from 'test/db';
import { createApp } from 'test/express';
import { User, userAdminColumns } from 'test/entity/User';
import generator from '~/generator';
import { entitiesMap } from 'test/entity';
import loadFixtures from 'test/fixtures';

describe('updateOne', () => {
  this.app = undefined;
  beforeEach(async () => {
    await connect();
    this.app = await createApp();
    await loadFixtures('test/fixtures');
  });
  afterEach(() => {
    return getConnection().close();
  });
  context('base setup', () => {
    beforeEach(() => {
      const config = {
        models: [
          {
            label: 'users',
            entity: 'User',
            routes: {
              updateOne: {
                enabled: true,
              },
            },
            columns: userAdminColumns,
          },
        ],
      };
      this.app.use(generator(config, entitiesMap, getRepository));
    });
    it('should update one user', async () => {
      const repository = getRepository(User);
      const user = await repository.findOne();

      return request(this.app)
        .patch(`/users/${user.id}`)
        .send({ data: { firstName: 'newname' } })
        .expect(200)
        .then(async response => {
          assert.equal(response.body.firstName, 'newname');
          const newUser = await repository.findOne(user.id);
          assert.equal(newUser.firstName, 'newname');
        });
    });
    it('should not update id', async () => {
      const repository = getRepository(User);
      const user = await repository.findOne();
      return request(this.app)
        .patch(`/users/${user.id}`)
        .send({ data: { id: 5 } })
        .expect(200)
        .then(async response => {
          assert.equal(response.body.id, 1);
        });
    });
  });

  context('with omitAttributes', () => {
    beforeEach(() => {
      const config = {
        models: [
          {
            label: 'users',
            entity: 'User',
            routes: {
              updateOne: {
                enabled: true,
                omitAttributes: ['role'],
              },
            },
          },
        ],
      };
      this.app.use(generator(config, entitiesMap, getRepository));
    });

    it('should update one user', async () => {
      const repository = getRepository(User);
      const user = await repository.findOne();
      assert.notEqual(user.role, 'ghost');
      return request(this.app)
        .patch(`/users/${user.id}`)
        .send({ data: { role: 'ghost' } })
        .expect(200)
        .then(async response => {
          assert.equal(response.body.role, user.role);
        });
    });
  });
});
