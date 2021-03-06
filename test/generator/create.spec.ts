import * as request from 'supertest';
import { assert } from 'chai';
import 'mocha';
import { getRepository, getConnection } from 'typeorm';
import { connect } from 'test/db';
import { createApp } from 'test/express';
import { User, userAdminColumns } from 'test/entity/User';
import generator from '~/generator';
import { entitiesMap } from 'test/entity';

describe('create generator', () => {
  this.app = undefined;
  this.repository = undefined;
  beforeEach(async () => {
    await connect();
    this.app = createApp();
    this.repository = getRepository(User);
  });

  afterEach(() => {
    return getConnection().close();
  });

  context('base setup', () => {
    beforeEach(async () => {
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
            columns: userAdminColumns,
          },
        ],
      };
      this.app.use(generator(config, entitiesMap, getRepository));
    });

    it('should create user', () => {
      return request(this.app)
        .post('/users')
        .send({
          data: {
            id: 5,
            firstName: 'john',
            lastName: 'Smith',
            age: 20,
            role: 'editor',
          },
        })
        .expect(201)
        .then(async response => {
          assert.equal(response.body.firstName, 'john');
          assert.equal(response.body.lastName, 'Smith');
          assert.equal(response.body.age, 20);
          assert.equal(response.body.id, 1);

          const users = await this.repository.find();
          assert.equal(users.length, 1);
          assert.equal(users[0].firstName, 'john');
          assert.equal(users[0].role, 'editor');
        });
    });

    it('should throw error', () => {
      return request(this.app)
        .post('/users')
        .send({
          data: {},
        })
        .expect(500)
        .then(async response => {
          assert.deepEqual(response.body, {
            success: false,
          });
        });
    });
  });

  context('with omitAttributes', () => {
    beforeEach(async () => {
      const config = {
        models: [
          {
            label: 'users',
            entity: 'User',
            routes: {
              create: {
                enabled: true,
                omitAttributes: ['role'],
              },
            },
          },
        ],
      };
      this.app.use(generator(config, entitiesMap, getRepository));
    });

    it('should not set role value', () => {
      return request(this.app)
        .post('/users')
        .send({
          data: {
            firstName: 'john',
            lastName: 'Smith',
            age: 20,
            role: 'editor',
          },
        })
        .expect(201)
        .then(async response => {
          assert.equal(response.body.role, 'ghost');
        });
    });
  });

  context('with responseOmitAttributes', () => {
    beforeEach(async () => {
      const config = {
        models: [
          {
            label: 'users',
            entity: 'User',
            responseOmitAttributes: ['role'],
            routes: {
              create: {
                enabled: true,
              },
            },
          },
        ],
      };
      this.app.use(generator(config, entitiesMap, getRepository));
    });

    it('should not set role value', () => {
      return request(this.app)
        .post('/users')
        .send({
          data: {
            firstName: 'john',
            lastName: 'Smith',
            age: 20,
            role: 'editor',
          },
        })
        .expect(201)
        .then(async response => {
          assert.equal(response.body.role, undefined);
        });
    });
  });
});
