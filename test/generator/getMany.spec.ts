import { assert } from 'chai';
import 'mocha';
import * as request from 'supertest';
import { getRepository, getConnection } from 'typeorm';

import { connect } from 'test/db';
import { createApp } from 'test/express';
import { userAdminColumns } from 'test/entity/User';
import generator from '~/generator';

import { entitiesMap } from 'test/entity';
import loadFixtures from 'test/fixtures';

describe('generator getMany', () => {
  this.app = undefined;

  beforeEach(async () => {
    await connect();
    this.app = await createApp();
    await loadFixtures('test/fixtures');
  });

  beforeEach(() => {
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
          columns: userAdminColumns,
        },
      ],
    };
    this.app.use(generator(config, entitiesMap, getRepository));
  });
  afterEach(() => {
    return getConnection().close();
  });
  it('should return all users', async () => {
    return request(this.app)
      .get('/users')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 2);
      });
  });

  context('should return filtered users', () => {
    it('should return filtered users', async () => {
      return request(this.app)
        .get('/users?filter=and(firstName:eq:aaa)')
        .expect(200)
        .then(response => {
          assert.equal(response.body.items.length, 1);
          assert.equal(response.body.items[0].firstName, 'aaa');
        });
    });

    it('should return filtered users with boolean true', async () => {
      return request(this.app)
        .get('/users?filter=and(active:eq:true)')
        .expect(200)
        .then(response => {
          assert.equal(response.body.items.length, 1);
          assert.equal(response.body.items[0].firstName, 'aaa');
          assert.equal(response.body.items[0].active, true);
        });
    });

    it('should return filtered users with boolean false', async () => {
      return request(this.app)
        .get('/users?filter=and(active:eq:false)')
        .expect(200)
        .then(response => {
          assert.equal(response.body.items.length, 1);
          assert.equal(response.body.items[0].firstName, 'ccc');
          assert.equal(response.body.items[0].active, false);
        });
    });

    it('should return filtered users with enum value', async () => {
      return request(this.app)
        .get('/users?filter=and(role:eq:editor)')
        .expect(200)
        .then(response => {
          assert.equal(response.body.items.length, 1);
          assert.equal(response.body.items[0].firstName, 'ccc');
          assert.equal(response.body.items[0].role, 'editor');
        });
    });

    it('should not return relations data', () => {
      return request(this.app)
        .get('/users?filter=and(firstName:eq:aaa)')
        .expect(200)
        .then(response => {
          assert.equal(response.body.items.length, 1);
          assert.equal(response.body.items[0].firstName, 'aaa');
          assert.equal(response.body.items[0].company, undefined);
        });
    });
  });

  it('should return with correct sort', async () => {
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

  it('should return with correct sort', async () => {
    return request(this.app)
      .get('/users?sort=id:desc,age:desc')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 2);
        assert.equal(response.body.items[0].firstName, 'ccc');
        assert.deepEqual(response.body.sort, [
          {
            column: 'id',
            order: 'desc',
          },
          {
            column: 'age',
            order: 'desc',
          },
        ]);
      });
  });
});

describe('generator getMany with relations', () => {
  this.app = undefined;

  beforeEach(async () => {
    await connect();
    this.app = await createApp();
    await loadFixtures('test/fixtures');
  });

  beforeEach(() => {
    const config = {
      models: [
        {
          label: 'users',
          entity: 'User',
          relations: ['company'],
          routes: {
            getMany: {
              enabled: true,
            },
          },
          columns: userAdminColumns,
        },
      ],
    };
    this.app.use(generator(config, entitiesMap, getRepository));
  });
  afterEach(() => {
    return getConnection().close();
  });
  it('should not return relations data', () => {
    return request(this.app)
      .get('/users?filter=and(firstName:eq:aaa)')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 1);
        assert.equal(response.body.items[0].firstName, 'aaa');
        assert.equal(response.body.items[0].company.id, 1);
      });
  });
});
