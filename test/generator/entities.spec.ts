import 'mocha';
import * as chai from 'chai';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { runMigrations, revertAllMigrations } from 'test/db';
import { createApp } from '~/express';
import { User } from '~/entity/User';
import generator from '~/generator';

const assert = chai.assert;

describe('get entities', () => {
  this.app = undefined;
  this.repository = undefined;
  beforeEach(runMigrations);
  beforeEach(async () => {
    this.app = createApp();
    this.repository = getRepository(User);
  });
  afterEach(revertAllMigrations);
  it('should return columns', () => {
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
      .get('/entities')
      .expect(200)
      .then(async response => {
        assert.equal(response.body.entities.length, 1);
        assert.deepEqual(
          response.body.entities[0].columns,
          User.toAdminJson().columns,
        );
      });
  });
});
