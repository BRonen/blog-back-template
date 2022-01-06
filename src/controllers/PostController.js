const { User, Post } = require('../models')

module.exports = {
  async index(req, res){
    const { userId } = req

    const posts = await Post.findAll({
      where: {
        UserId: userId
      },
      attributes: { exclude: ['UserId'] }
    })

    if(posts.length === 0)
      return res.json({posts: 'you dont have any posts'})

    return res.json(posts)
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

  async update(req, res){ //will need some auth
    const { title, content, id } = req.body

    const post = await Post.update(
      {
        title: title,
        content: content,
      },
      {
        where: { id: id }
      }
    )

    return res.json(post)
  },

  async delete(req, res){ //will need some auth
    const { id } = req.body

    const post = await Post.destroy({
      where: { id: id }
    })

    return res.json(post)
  }
}
