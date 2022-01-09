const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/models')

const truncate = require('../utils/truncate')

describe('User login', () => {
  beforeEach(truncate)

  it('should get a jwt token when authenticated with valid password', async () => {
    const passwordString = 'admin'

    const user = await User.create({
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: passwordString
    })

    const authResponse = await request(app)
      .get(`/users?id=${user.id}&password=${passwordString}`)

    expect(authResponse.status).toBe(200)

    expect(authResponse.body).toHaveProperty('token')

    expect(authResponse.body).not.toHaveProperty('err')
  })


  it('should not get a jwt token when authenticated with invalid password', async () => {
    const userData = {
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: 'admin'
    }

    const wrongPassword = 'wrong'

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    const user = createResponse.body

    const authResponse = await request(app)
      .get(`/users?id=${user.id}&password=${wrongPassword}`)

    expect(authResponse.status).toBe(200)

    expect(authResponse.body).not.toHaveProperty('token')

    expect(authResponse.body).toHaveProperty('err')

    const { err } = authResponse.body

    expect(err).toBe('wrong password')
  })


  it('should not get a jwt token when authenticated with invalid id', async () => {
    const userData = {
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: 'admin'
    }

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    const user = createResponse.body

    const wrongId = user.id + 1

    const authResponse = await request(app)
      .get(`/users?id=${wrongId}&password=${userData.password}`)

    expect(authResponse.status).toBe(404)

    expect(authResponse.body).not.toHaveProperty('token')

    expect(authResponse.body).toHaveProperty('err')

    const { err } = authResponse.body

    expect(err).toBe('user not found')
  })


  it('should validate a jwt token received from valid authentication', async () => {
    const passwordString = 'admin'

    const user = await User.create({
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: passwordString
    })

    const authResponse = await request(app)
      .get(`/users?id=${user.id}&password=${passwordString}`)

    const { token } = authResponse.body

    const authTestResponse = await request(app)
      .get(`/auth`)
      .set('authorization', `Bearer ${token}`)

    expect(authTestResponse.status).toBe(200)
    expect(authTestResponse.body).toHaveProperty('id')

    const { id } = authTestResponse.body

    expect(id).toBe(user.id)
  })
})
