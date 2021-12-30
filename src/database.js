const { Sequelize } = require('sequelize')

const connection = new Sequelize(
  process.env.DB_DTBS,
  process.env.DB_USER,
  process.env.DB_PSWD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DLCT,
  }
)

connection.authenticate().then(async () => {
  console.log('Connection has been established successfully.')

}).catch(error => {
  console.error('Unable to connect to the database:', error)
})


module.exports = connection