const router = require('express').Router()

const PostController = require('./controllers/PostController')

router.get('/', (req, res) => (
  res.status(200).send('Hello world')
))

router.get('/posts', PostController.index)

router.post('/posts', PostController.store)

module.exports = router