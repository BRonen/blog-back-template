const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/models')

const truncate = require('../utils/truncate')

describe('User login', () => {
  beforeEach(truncate)

  it('should get a jwt token when authenticated with id and valid password', async () => {
    const passwordString = 'admin'

    const user = await User.create({
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: passwordString
    })

    const authResponse = await request(app)
      .post('/auth')
      .send({
        id: user.id,
        password: passwordString
      })

    const { status, body } = authResponse

    expect(status).toBe(200)

    expect(body).toHaveProperty('token')

    const { token } = body

    const authTestResponse = await request(app)
      .get('/auth')
      .set('authorization', `Bearer ${token}`)

    const { id } = authTestResponse.body

    expect(id).toBe(user.id) 
  })


  it('should get a jwt token when authenticated with email and valid password', async () => {
    const passwordString = 'admin'

    const user = await User.create({
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: passwordString
    })

    const authResponse = await request(app)
      .post('/auth')
      .send({
        email: user.email,
        password: passwordString
      })

    const { status, body } = authResponse

    expect(status).toBe(200)

    expect(body).toHaveProperty('token')

    const { token } = body

    const authTestResponse = await request(app)
      .get('/auth')
      .set('authorization', `Bearer ${token}`)

    const { id } = authTestResponse.body

    expect(id).toBe(user.id) 
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
      .post('/auth')
      .send({
        id: user.id,
        password: wrongPassword
      })

    expect(authResponse.status).toBe(403)

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
      .post('/auth')
      .send({
        id: wrongId,
        password: userData.password
      })

    expect(authResponse.status).toBe(404)

    expect(authResponse.body).not.toHaveProperty('token')

    expect(authResponse.body).toHaveProperty('err')

    const { err } = authResponse.body

    expect(err).toBe('user not found')
  })


  it('should invalidate a unbearable jwt token', async () => {
    const token = "ZWRBdNMKsB9UY"
    
    const authTestResponse = await request(app)
      .get(`/auth`)
      .set('authorization', `unBearer ${token}`)

    expect(authTestResponse.status).toBe(401)
    expect(authTestResponse.body).not.toHaveProperty('id')

    expect(authTestResponse.body).toHaveProperty('err')
    expect(authTestResponse.body.err).toBe('unbearable')
  })


  it('should invalidate a fake jwt token', async () => {
    const token = "ZWRBdNMKsB9UY"

    const authTestResponse = await request(app)
      .get(`/auth`)
      .set('authorization', `Bearer ${token}`)

    expect(authTestResponse.status).toBe(401)
    expect(authTestResponse.body).not.toHaveProperty('id')

    expect(authTestResponse.body).toHaveProperty('err')
    expect(authTestResponse.body.err).toBe('token invalid')
  })
})
