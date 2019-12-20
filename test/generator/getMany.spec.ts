import * as chai from 'chai';
import 'mocha';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { runMigrations, revertAllMigrations } from 'test/db';
import { createApp } from '~/express';
import { User } from '~/entity/User';
import generator from '~/generator';

const assert = chai.assert;

describe('generator getAll', () => {
  this.app = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = await createApp();
    const repository = getRepository(User);
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
  it('should return all users', async () => {
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            getMany: {
              enabled: true,
            },
          },
        },
      ],
    };

    generator(this.app, config);
    return request(this.app)
      .get('/users')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 2);
        assert.equal(response.body.items[0].firstName, 'aaa');
        assert.equal(response.body.items[1].firstName, 'ccc');
      });
  });

  it('should return filtered users', async () => {
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            getMany: {
              enabled: true,
            },
          },
        },
      ],
    };

    generator(this.app, config);
    return request(this.app)
      .get('/users?filter=and(firstName:eq:aaa)')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 1);
        assert.equal(response.body.items[0].firstName, 'aaa');
      });
  });

  it('should return with correct sort', async () => {
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          routes: {
            getMany: {
              enabled: true,
            },
          },
        },
      ],
    };

    generator(this.app, config);
    return request(this.app)
      .get('/users?sort=id:desc')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 2);
        assert.equal(response.body.items[0].firstName, 'ccc');
        assert.deepEqual(response.body.sort, [
          {
            column: 'id',
            order: 'desc',
          },
        ]);
      });
  });
});
