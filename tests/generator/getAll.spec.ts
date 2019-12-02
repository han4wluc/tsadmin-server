import {createApp} from '../../src/express'
import {User} from '../../src/entity/User'
import * as request from 'supertest'
import * as chai from 'chai'
import 'mocha';
import {getRepository} from "typeorm"
import generator from '../../src/generator'

const assert = chai.assert

describe('generator getAll', () => {
  this.app = undefined;
  beforeEach(async () => {
    this.app = await createApp()
    const repository = getRepository(User)
    await repository.query(`DELETE FROM user;`);
    const user = new User({
      firstName: 'aaa',
      lastName: 'bbb',
      age: 9
    })
    const user2 = new User({
      firstName: 'ccc',
      lastName: 'ddd',
      age: 10
    })
    await repository.save(user)
    await repository.save(user2)
  })

// pageNum=1&
// pageSize=100&
// sort=id:desc,username:asc&

  it('should return all users', async () => {
    const config = {
      models: [{
        label: 'users',
        entity: User,
        routes: {
            getMany: {
                enabled: true
            }
        }
    }]}

    generator(this.app, config)
    return request(this.app)
      .get('/users')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 2)
        assert.equal(response.body.items[0].firstName, 'aaa')
        assert.equal(response.body.items[1].firstName, 'ccc')
     })
  });

  it('should return filtered users', async () => {
    const config = {
      models: [{
        label: 'users',
        entity: User,
        routes: {
            getMany: {
                enabled: true
            }
        }
    }]}

    generator(this.app, config)
    return request(this.app)
      .get('/users?filter=and(firstName:eq:aaa)')
      .expect(200)
      .then(response => {
        assert.equal(response.body.items.length, 1)
        assert.equal(response.body.items[0].firstName, 'aaa')
      })
 
  })
});
