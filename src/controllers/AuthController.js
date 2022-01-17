const { User } = require('../models')
const { genToken } = require('../middlewares/auth')

module.exports = {
  async auth(req, res){
    const { userId } = req

    return res.json({id: userId})
  },

  async create(req, res){
    const { id, email, password } = req.body

    if(!password)
        return res.status(422).json({err: "Password invalid"})

    let user

    if(id)
        user = await User.findByPk(id)
    
    if(email)
        user = await User.findOne({
            where: { email: email }
        })

    if(!user)
      return res.status(404).json({ err: 'user not found' })

    const authenticated = await user.auth(password)

    if(!authenticated)
        return res.status(403).json({err: 'wrong password'})

    const token = genToken(user.dataValues)

    return res.json({ token })
  },
}
