const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/models')

const truncate = require('../utils/truncate')

describe('User model', () => {
  beforeEach(truncate)

  it('should create authenticate a new user with model', async () => {
    const user = await User.create({
      name: 'Test One',
      email: 'one@test.com',
      password: 'one'
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')

    expect(user.name).toBe('Test One')
    expect(user.email).toBe('one@test.com')

    const authenticated = await user.auth('one')

    expect(authenticated).toBe(true)
  })


  it('should create a new user with API route', async () => {
    const userData = {
      name: 'Test Two',
      email: 'two@test.com',
      password: 'two'
    }

    const createResponse = await request(app)
      .post('/users')
      .send(userData)
  
    expect(createResponse.body).toHaveProperty('user')

    const { user } = createResponse.body

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).not.toHaveProperty('password')

    const { name, email } = user

    expect(name).toBe(userData.name)
    expect(email).toBe(userData.email)
  })

  it('should not share email between users', async () => {
    const userData = {
      name: 'Test Three',
      email: 'three@test.com',
      password: 'three'
    }

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    const { user } = createResponse.body

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).not.toHaveProperty('password')

    const { name, email } = user

    expect(name).toBe(userData.name)
    expect(email).toBe(userData.email)
  })
})
