import {createApp} from '../../src/express'
import {User} from '../../src/entity/User'
import * as request from 'supertest'
import * as chai from 'chai'
import 'mocha';
import {getRepository} from "typeorm"
import generator from '../../src/generator'
import { goldenrod } from 'color-name';

const assert = chai.assert

describe('updateOne', () => {
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
    await repository.save(user)
  })

  it('should update one user', async () => {
    const repository = getRepository(User)
    const config = {
      models: [{
        label: 'users',
        entity: User,
        routes: {
            updateOne: {
                enabled: true
            }
        }
    }]}

    const user = await repository.findOne()

    generator(this.app, config)
    return request(this.app)
      .patch(`/users/${user.id}`)
      .send({firstName: 'newname'})
      .expect(200)
      .then(async (response) => {
        assert.equal(response.body.firstName, 'newname')
        const newUser = await repository.findOne(user.id)
        assert.equal(newUser.firstName, 'newname')
     })
  });



});
