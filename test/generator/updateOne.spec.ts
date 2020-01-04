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
  });
  afterEach(revertAllMigrations);
  it('should update one user', async () => {
    const repository = getRepository(User);
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

    const user = await repository.findOne();

    this.app.use(generator(config, entitiesMap, getRepository));
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
});
