const router = require('express').Router()

const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')

const { authTest } = require('./middlewares/auth')

router.get('/', (req, res) => (
  res.json({server: 'running...'})
))

router.get('/auth', authTest, (req, res) => (
  res.json({ id: req.userId }) //only a debug temp route
))

router.get('/posts', PostController.index)
      .post('/posts', PostController.store)

router.get('/users', UserController.index)
      .post('/users', UserController.store)

module.exports = router
