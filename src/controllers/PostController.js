const { Post } = require('../models')

module.exports = {
  async index(req, res){
    const { id } = req.query

    if(id){
      const post = await Post.findByPk(id)

      if(!post)
        return res.status(404).json({ error: '404' })

      return res.json(post)
    }

    const posts = await Post.findAll({
      include: {
        association: 'author',
      },
      attributes: { exclude: ['UserId'] }
    })

    return res.json(posts)
  },

  async store(req, res){
    const { title, content } = req.body

    if(!title | !content)
      return res.status(404).json({
        error: '404'
      })

    const post = await Post.create({
      title: title,
      content: content
    })

    return res.json(post)
  },

  async update(req, res){
    const {title, content, id} = req.body

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

  async delete(req, res){
    const {id} = req.body

    const post = await Post.destroy({
      where: { id: id }
    })

    return res.json(post)
  }
}
