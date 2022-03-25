const AuthenticationError = require('../errors/AuthenticationError')

module.exports = (req,res,next)=>{
    console.log(req.session)
    if(req.session.userId){
        next()
    }else {
        throw new AuthenticationError('Not authenticated')
    }
}