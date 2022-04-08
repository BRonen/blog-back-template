const { User } = require('../models')

module.exports = {
  async index(req, res){
    const users = await User.findAll({
      include: {
        association: 'posts'
      },
      attributes: { exclude: ['password'] }
    })

    return res.json({ users })
  },

  async search(req, res){
    const { userId } = req.params

    const user = await User.findByPk(userId, {
      include: {
        association: 'posts'
      },
      attributes: { exclude: ['password'] }
    })
    
    if(!user)
      res.json({err: "user not found"})

    return res.json({ user })

  },

  async store(req, res){
    const { name, email, password } = req.body

    if(!name)
      return res.json({err: 'name invalid'})

    if(!email)
      return res.json({err: 'email invalid'})

    if(!password)
      return res.json({err: 'password invalid'})

    const emailAlreadyUsed = await User.findOne({
      where: { email }
    })
    
    if(emailAlreadyUsed)
      return res.json({err: 'email already used'})

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    })

    user.password = undefined

    return res.json({ user })
  },
}
