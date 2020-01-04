import { getRepository } from 'typeorm';
import * as request from 'supertest';
import * as chai from 'chai';
import 'mocha';

import { runMigrations, revertAllMigrations } from 'test/db';

import { createApp } from '~/express';
import { User } from '~/entity/User';
import generator from '~/generator';
import { entitiesMap } from '~/entity';

const assert = chai.assert;

describe('updateOne', () => {
  this.app = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = await createApp();
    this.repository = getRepository(User);
    const user = new User({
      firstName: 'aaa',
      lastName: 'bbb',
      age: 9,
    });
    await this.repository.save(user);
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
            delete: {
              enabled: true,
            },
          },
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
