import { createApp } from '../../src/express';
import { User } from '../../src/entity/User';
import * as request from 'supertest';
import * as chai from 'chai';
import 'mocha';
import { getRepository } from 'typeorm';
import generator from '../../src/generator';

const assert = chai.assert;

describe('create generator', () => {
  this.app = undefined;
  this.repository = undefined;
  beforeEach(async () => {
    this.app = await createApp();
    this.repository = getRepository(User);
    await this.repository.query(`DELETE FROM user;`);
  });
  it('should return true', () => {
    const config = {
      models: [
        {
          label: 'users',
          entity: User,
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
      .send({ firstName: 'john', lastName: 'Smith', age: 20 })
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
