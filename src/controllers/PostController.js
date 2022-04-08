const { Post } = require('../models')

module.exports = {
  async index(req, res){
    const { page, perPage } = req.query
    
    const query = {
      order: [['created_at', 'DESC']]
    }

    if(page && perPage)
      query.offset = (page - 1) * perPage 
    if(perPage)
      query.limit = perPage
    try{
    const posts = await Post.findAll(query)
    return res.json({ posts })
    }catch(e){
      console.log(e)
      return res.json(e)
    }
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
