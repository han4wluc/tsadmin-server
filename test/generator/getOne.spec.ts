import * as request from 'supertest';
import 'mocha';
import * as chai from 'chai';
import { getRepository } from 'typeorm';

import { createApp } from '~/express';
import { User } from '~/entity/User';
import generator from '~/generator';

const assert = chai.assert;

describe('generator getAll', () => {
  this.app = undefined;
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

    generator(this.app, config);
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

    generator(this.app, config);
    return request(this.app)
      .get(`/users/99999999`)
      .expect(404);
  });
});
