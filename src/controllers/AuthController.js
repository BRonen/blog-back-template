const { User } = require('../models')
const { genToken } = require('../middlewares/auth')

module.exports = {
  async auth(req, res){
    const { userId } = req

    return res.json({id: userId})
  },

  async create(req, res){
    const { email, password } = req.body

    if(!password)
        return res.json({err: "Password invalid"})

    const user = await User.findOne({
      where: { email: email }
    })

    if(!user)
      return res.json({ err: 'user not found' })

    const authenticated = await user.auth(password)

    if(!authenticated)
        return res.json({err: 'wrong password'})

    const token = genToken(user.dataValues)

    return res.json({ token })
  },
}
