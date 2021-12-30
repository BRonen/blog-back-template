const router = require('express').Router()

const PostController = require('./controllers/PostController')

router.get('/', (req, res) => (
  res.status(200).send('Hello world')
))

router.get('/posts', PostController.index)
      .post('/posts', PostController.store)
      .put('/posts', PostController.update)
      .delete('/posts', PostController.delete)

module.exports = router