import * as request from 'supertest';
import 'mocha';
import * as chai from 'chai';
import { getRepository } from 'typeorm';

import { runMigrations, revertAllMigrations } from 'test/db';
import { createApp } from 'test/express';
import { User } from 'test/entity/User';
import generator from '~/generator';

import { entitiesMap } from 'test/entity';

const assert = chai.assert;

describe('generator getAll', () => {
  this.app = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = await createApp();
    const repository = getRepository(User);
    await repository.query(`DELETE FROM user;`);
    const user = new User({
      firstName: 'aaa',
      lastName: 'bbb',
      age: 9,
    });
    const user2 = new User({
      firstName: 'ccc',
      lastName: 'ddd',
      age: 10,
    });
    await repository.save(user);
    await repository.save(user2);
  });
  afterEach(revertAllMigrations);
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
