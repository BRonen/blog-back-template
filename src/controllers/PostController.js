const { Post } = require('../models')

module.exports = {
  async index(req, res){
    const { page, perPage } = req.query
    
    let offset, limit

    if(page && perPage)
      offset = page * perPage
    if(perPage)
      limit = perPage

    console.log({
      offset, limit
    })

    const posts = await Post.findAll({
      offset, limit
    })

    return res.json(posts)
  },

  async search(req, res){
    const { postId } = req.params

    const post = await Post.findByPk(postId)

    if(!post)
      return res.json({err: 'we dont have this post'})

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
