const request = require('supertest')
const app = require('../../src/app')

const truncate = require('../utils/truncate')

describe('User login', () => {
  beforeEach(truncate)

  it('should get a jwt token when authenticated with id and valid password', async () => {
    const userData = {
      name: 'Teste One',
      email: 'One@test.com',
      password: 'One'
    }

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    const { user } = createResponse.body

    const authResponse = await request(app)
      .post('/auth')
      .send(userData)

    expect(authResponse.body).toHaveProperty('token')

    const { token } = authResponse.body

    const authTestResponse = await request(app)
      .get('/auth')
      .set('authorization', `Bearer ${token}`)

    const { id } = authTestResponse.body

    expect(id).toBe(user.id) 
  })


  it('should get a valid jwt token when authenticated with email and valid password', async () => {
    const userData = await {
      name: 'Teste Two',
      email: 'Two@test.com',
      password: 'Two'
    }

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    const { user } = createResponse.body

    const authResponse = await request(app)
      .post('/auth')
      .send(userData)

    const { body } = authResponse

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
      name: 'Teste Three',
      email: 'Three@test.com',
      password: 'Three'
    }

    const wrongPassword = 'wrong'

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    const { user } = createResponse.body

    const authResponse = await request(app)
      .post('/auth')
      .send({
        email: user.email,
        password: wrongPassword
      })

    expect(authResponse.body).not.toHaveProperty('token')

    expect(authResponse.body).toHaveProperty('err')

    const { err } = authResponse.body
    expect(err).toBe('wrong password')
  })


  it('should invalidate a unbearable jwt token', async () => {
    const token = "ZWRBdNMKsB9UY"
    
    const authResponse = await request(app)
      .get(`/auth`)
      .set('authorization', `unBearer ${token}`)

    expect(authResponse.body).not.toHaveProperty('id')
    expect(authResponse.body).toHaveProperty('err')

    const { err } = authResponse.body
    expect(err).toBe('unbearable')
  })


  it('should invalidate a fake jwt token', async () => {
    const token = "ZWRBdNMKsB9UY"

    const authResponse = await request(app)
      .get(`/auth`)
      .set('authorization', `Bearer ${token}`)

    expect(authResponse.status).toBe(401)
    expect(authResponse.body).not.toHaveProperty('id')

    expect(authResponse.body).toHaveProperty('err')

    const { err } = authResponse.body
    expect(err).toBe('token invalid')
  })
})
