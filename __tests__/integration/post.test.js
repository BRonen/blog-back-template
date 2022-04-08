const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/models')

const truncate = require('../utils/truncate')

const userDataExample = {
    name: 'Test Example',
    email: 'Example@test.com',
    password: 'Example'
}

const PostDataExample = {
    title: 'Test Post',
    content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Cras tristique lacus a elementum hendrerit.
    `
}

async function authenticateUser({name, email, password}){
    const authResponse = await request(app)
      .post('/auth')
      .send({
        email: email,
        password: password,
      })

    const { token } = authResponse.body

    return token
}
  
describe('Post model', () => {
    beforeEach(async () => {
        await truncate()
        await User.create(userDataExample)
    })

    it('should create a new post and associate with an User', async () => {
        const token = await authenticateUser(userDataExample)

        const createResponse = await request(app)
          .post('/posts')
          .set('authorization', `Bearer ${token}`)
          .send(PostDataExample)
        
        expect(createResponse.body).toHaveProperty('post')

        const { post } = createResponse.body

        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('content')

        const { title, content } = post

        expect(title).toBe(PostDataExample.title)
        expect(content).toBe(PostDataExample.content)
    })

    it('should create and get multiples posts', async () => {
        const token = await authenticateUser(userDataExample)

        for(let i = 1; i <= 10; i++){
            await request(app)
                .post('/posts')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: `Post number ${i}`,
                    content: `Lorem ipsum dolor sit amet ${i}.`
                })
        }

        const allPostsRequest = await request(app)
            .get('/posts')
        
        expect(allPostsRequest.body).toHaveProperty('posts')

        const { posts } = allPostsRequest.body

        expect(posts.length).toBe(10)
    })

    it('should use pagination to get the last five posts', async () => {
        const token = await authenticateUser(userDataExample)
        const postsToAnalize = []

        for(let i = 1; i <= 10; i++){
            const createResponse = await request(app)
                .post('/posts')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: `Post number ${i}`,
                    content: `Lorem ipsum dolor sit amet ${i}.`
                })

            if(i > 5){
                const { post } = createResponse.body
                postsToAnalize.push( JSON.stringify(post) )
            }
        }

        const lastFivePostsRequest = await request(app)
            .get('/posts?perPage=5')
        
        expect(lastFivePostsRequest.body).toHaveProperty('posts')

        const { posts } = lastFivePostsRequest.body

        posts.forEach(post => {
            expect(postsToAnalize).toContain( JSON.stringify(post) )
        })
    })
})