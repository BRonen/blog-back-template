const { User } = require('../models')

module.exports = {
  async index(req, res){
    const users = await User.findAll({
      include: {
        association: 'posts'
      },
      attributes: { exclude: ['password'] }
    })

    return res.json(users)
  },

  async search(req, res){
    const { userId } = req.params

    const user = await User.findByPk(userId)
    
    if(!user)
      res.status(404).json({err: "user not found"})

    return res.json(user)

  },

  async store(req, res){
    const { name, email, password } = req.body

    if(!name)
      return res.status(404).json({
        err: 'name invalid'
      })
    if(!email)
      return res.status(404).json({
        err: 'email invalid'
      })
    if(!password)
      return res.status(404).json({
        err: 'password invalid'
      })

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    })

    user.password = undefined

    return res.json(user)
  },
}
