const express = require('express')
const router = require('./routes')

const cors = require('cors')

class App{
  constructor(){
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares(){
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes(){
    this.express.use('/', router)
  }
}

module.exports = new App().express
