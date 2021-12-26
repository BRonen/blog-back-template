const { Sequelize } = require('sequelize')
const Post = require('./models/Post')

const connection = new Sequelize(
  process.env.DB_DTBS,
  process.env.DB_USER,
  process.env.DB_PSWD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

try{
  connection.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  })
}catch (error) {
  console.error('Unable to connect to the database:', error)
}

Post.init(connection)

module.exports = connection