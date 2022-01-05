const { User, Post } = require('../models')

module.exports = {
  async index(req, res){
    const { id, password } = req.query

    if(id && password){
      console.log(id, password)
      const user = await User.findByPk(id)

      if(!user)
        return res.status(404).json({ err: '404' })

      const auth = await user.auth(password)

      if(!auth)
        return res.json({err: 'wrong password'})

      user.password = undefined
      return res.json(user)
    }

    const users = await User.findAll({
      include: {
        association: 'posts',
        attributes: { exclude: ['UserId'] }
      },
      attributes: { exclude: ['password'] }
    })

    return res.json(users)
  },

  async store(req, res){
    const { name, email, password } = req.body

    console.log({
        name: name,
        email: email,
        password: password,
      })
    if(!name || !email || !password)
      return res.status(404).json({
        error: '404'
      })

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    })

    return res.json(user)
  },

  async update(req, res){ //will need some auth
    const { name, email, id } = req.body

    const user = await User.update(
      {
        name: name,
        email: email,
      },
      {
        where: { id: id }
      }
    )

    return res.json(user)
  },

  async delete(req, res){ //will need some auth
    const { id } = req.body

    const user = await User.destroy({
      where: { id: id }
    })

    return res.json(user)
  }
}
