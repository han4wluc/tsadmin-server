import * as request from 'supertest';
import * as chai from 'chai';
import 'mocha';
import { getRepository, getConnection } from 'typeorm';
import { connect, runMigrations, revertAllMigrations } from 'test/db';

import { createApp } from '~/express';
import { User } from '~/entity/User';
import generator from '~/generator';

const assert = chai.assert;

before(() => {
  return connect();
});

after(() => {
  return getConnection().close();
});

describe('create generator', () => {
  this.app = undefined;
  this.repository = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = createApp();
    this.repository = getRepository(User);
  });
  afterEach(revertAllMigrations);
  it('should return true', () => {
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
        },
      ],
    };

    generator(this.app, config);

    return request(this.app)
      .post('/users')
      .send({ data: { firstName: 'john', lastName: 'Smith', age: 20 } })
      .expect(201)
      .then(async response => {
        assert.equal(response.body.firstName, 'john');
        assert.equal(response.body.lastName, 'Smith');
        assert.equal(response.body.age, 20);

        const users = await this.repository.find();
        assert.equal(users.length, 1);
        assert.equal(users[0].firstName, 'john');
      });
  });
});
