import { getRepository } from 'typeorm';
import * as request from 'supertest';
import * as chai from 'chai';
import 'mocha';

import { createApp } from '~/express';
import { User } from '~/entity/User';
import generator from '~/generator';

const assert = chai.assert;

describe('updateOne', () => {
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
    await repository.save(user);
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
        },
      ],
    };

    const user = await repository.findOne();

    generator(this.app, config);
    return request(this.app)
      .delete(`/users/${user.id}`)
      .expect(200)
      .then(async () => {
        const newUser = await repository.findOne(user.id);
        assert.equal(newUser, undefined);
      });
  });
});
