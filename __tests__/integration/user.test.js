const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/models')

const truncate = require('../utils/truncate')

describe('User model', () => {
  beforeEach(truncate)


  it('should create a new user with User model', async () => {
    const user = await User.create({
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: 'admin'
    })

    expect(user.name).toBe('Admin Nimda')
    expect(user.email).toBe('admin@admail.com')

    const passwordIsValid = await user.auth('admin')

    expect(passwordIsValid).toBe(true)
  })


  it('should create a new user with API route', async () => {
    const userData = {
      name: 'Admin Nimda',
      email: 'admin@admail.com',
      password: 'admin'
    }

    const createResponse = await request(app)
      .post('/users')
      .send(userData)

    expect(createResponse.status).toBe(200)

    expect(createResponse.body).toHaveProperty('id')
    expect(createResponse.body).toHaveProperty('name')
    expect(createResponse.body).toHaveProperty('email')

    const { name, email } = createResponse.body

    expect(name).toBe(userData.name)
    expect(email).toBe(userData.email)
  })
})
