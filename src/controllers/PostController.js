const { Post } = require('../models')

module.exports = {
  async index(req, res){
    const posts = await Post.findAll()

    if(posts.length === 0)
      return res.json({posts: 'we dont have any posts'})

    return res.json(posts)
  },

  async search(req, res){
    const { postId } = req.params

    const post = await Post.findByPk(postId)

    if(!post)
      return res.json({err: 'we dont have this posts'})

    return res.json(post)
  },

  async store(req, res){
    const { userId } = req
    const { title, content } = req.body

    if(!title)
      return res.json({
        error: 'please add a title'
      })

    if(!content)
      return res.json({
        error: 'please add a content'
      })

      const post = await Post.create({
        title: title,
        content: content,
        UserId: userId
      })

      return res.json(post)
  },
}
