const { User } = require('../models')

module.exports = {
  async index(req, res){
    const { id } = req.query

    if(id){
      const user = await User.findByPk(id)

      if(!user)
        return res.status(404).json({ error: '404' })
        
      return res.json(user)
    }

    const users = await User.findAll(id)
    return res.json(users)
  },

  async store(req, res){
    const { name, email } = req.body

    if(!name | !email)
      return res.status(404).json({
        error: '404'
      })

    const user = await User.create({
      name: name,
      email: email
    })

    return res.json(user)
  },

  async update(req, res){
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

  async delete(req, res){
    const { id } = req.body
    
    const user = await User.destroy({
      where: { id: id }
    })
  
    return res.json(user)
  }
}