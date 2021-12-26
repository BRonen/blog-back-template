const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log(`listening at port: ${process.env.PORT}\n`)
})