const { Post } = require('../models')

module.exports = {
  async index(req, res){
    const { page, perPage } = req.query
    
    let offset, limit

    if(page && perPage)
      offset = (page - 1) * perPage 
    if(perPage)
      limit = perPage

    const posts = await Post.findAll({
      offset, limit
    })
    return res.json({ posts })
  },

  async search(req, res){
    const { postId } = req.params

    const post = await Post.findByPk(postId)

    if(!post)
      return res.json({err: 'we dont have this post'})

    return res.json({ post })
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
      title, content, userId
    })

    return res.json({ post })
  },
}
