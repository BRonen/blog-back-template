const router = require('express').Router()

const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const { authTest } = require('./middlewares/auth')

router.get('/', (req, res) => (
  res.json({server: 'running...'})
))

router.get('/auth', authTest, AuthController.auth)
router.post('/auth', AuthController.create)

router.get('/users/:userId', UserController.search)
      .get('/users', UserController.index)
      .post('/users', UserController.store)

router.get('/posts/:postId', PostController.search)
      .get('/posts', PostController.index)
      .post('/posts', authTest, PostController.store)

module.exports = router
