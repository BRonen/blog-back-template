const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SIGN

function genToken(params){
  console.log(params)
  return jwt.sign(params, jwtSecret, {
    expiresIn: 86400,
  })
}

function authTest(req, res, next){
  const { authorization } = req.headers
  
  if(!authorization)
    return res.status(401).json({err: 'no token'})
    
  const parts = authorization.split(' ')

  if(parts.length !== 2)
    return res.status(401).json({err: 'token error'})
    
  const [scheme, token] = parts
  
  if(!/^Bearer$/i.test(scheme))
    return res.status(401).json({err: 'unbearable'})
  
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(err)
      return res.status(401).json({err: 'token invalid'})
    
    req.userId = decoded.id
    
    return next()
  })
}

module.exports = { genToken, authTest }
