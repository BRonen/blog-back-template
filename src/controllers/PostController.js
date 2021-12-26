const Post = require('../models/Post')

module.exports = {
  async index(req, res){
    const { id } = req.query

    if(id){
      const post = await Post.findByPk(id)
      return res.json(post)
    }

    const posts = await Post.findAll()
    return res.json(posts)
  },
  async store(req, res){
    const {title, content} = req.body

    if(!title | !content)
      return res.status(404)

    const post = await Post.create({
      title: title,
      content: content
    })

    return res.json(post)
  }
}