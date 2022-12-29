
const jwt = require('jsonwebtoken')
const User = require('../models/user')



const tokenExtractor = (request, response, next) => {
    
    const authorization = request.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        console.log("token",request.token)
      }
    
    next()
  }

 
const userExtractor = async (request, response, next) => {

  if (!request.token) {
    next()
  }
  else  {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    const user = await User.findById(decodedToken.id)
    request.user = user //decodedToken.id
    console.log(request.user)
    next()
  }
}

module.exports = {
    tokenExtractor,
    userExtractor
}