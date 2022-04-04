const request = require('supertest')
const app = require('../../src/app')
const { User } = require('../../src/models')

const truncate = require('../utils/truncate')

const userDataExample = {
  name: 'Test Example',
  email: 'Example@test.com',
  password: 'Example'
}

describe('User login', () => {
  beforeEach(async () => {
    await truncate()
    await User.create(userDataExample)
  })

  it('should get a valid jwt token when authenticated with email and valid password', async () => {
    
    const authResponse = await request(app)
      .post('/auth')
      .send({
        email: userDataExample.email,
        password: userDataExample.password,
      })

    const { body } = authResponse

    expect(body).toHaveProperty('token')

    const { token } = body

    const authTestResponse = await request(app)
      .get('/auth')
      .set('authorization', `Bearer ${token}`)

    expect(authTestResponse.body).toHaveProperty('id') 
  })


  it('should not get a jwt token when authenticated with invalid password', async () => {
    const wrongPassword = 'wrong'

    const authResponse = await request(app)
      .post('/auth')
      .send({
        email: userDataExample.email,
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
