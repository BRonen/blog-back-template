const router = require('express').Router()

const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')

router.get('/', (req, res) => (
  res.status(200).json({server: 'running...'})
))

router.get('/posts', PostController.index)
      .post('/posts', PostController.store)
      .put('/posts', PostController.update)
      .delete('/posts', PostController.delete)

router.get('/users', UserController.index)
      .post('/users', UserController.store)
      .put('/users', UserController.update)
      .delete('/users', UserController.delete)

module.exports = router
