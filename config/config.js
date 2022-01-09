require('dotenv').config()

module.exports = {
  development: {
    database: process.env.DB_DTBS,
    username: process.env.DB_USER,
    password: process.env.DB_PSWD,
    host:     process.env.DB_HOST,
    dialect:  process.env.DB_DLCT,
  },
  production: {
    database: process.env.DB_DTBS,
    username: process.env.DB_USER,
    password: process.env.DB_PSWD,
    host:     process.env.DB_HOST,
    dialect:  process.env.DB_DLCT,
  },
  test: {
    dialect:  'sqlite',
    storage:  './__tests__/database.sqlite',
    logging:  false,
  }
}
