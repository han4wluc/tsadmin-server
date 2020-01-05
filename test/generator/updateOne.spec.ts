import { getRepository } from 'typeorm';
import * as chai from 'chai';
import 'mocha';
import * as request from 'supertest';

import { runMigrations, revertAllMigrations } from 'test/db';
import { createApp } from 'test/express';
import { User } from 'test/entity/User';
import generator from '~/generator';
import { entitiesMap } from 'test/entity';
import loadFixtures from 'test/fixtures';

const assert = chai.assert;

describe('updateOne', () => {
  this.app = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = await createApp();
    await loadFixtures('test/fixtures');
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
        },
      ],
    };
    this.app.use(generator(config, entitiesMap, getRepository));
  });
  afterEach(revertAllMigrations);
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
