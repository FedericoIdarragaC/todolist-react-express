const RequestError = require('../errors/RequestError');

module.exports = (params) => (req,res,next)=>{
    params.forEach(param => {
        if(!req.body[param]){
            next(new RequestError(`${param} is required`));
        }
    });
    next();
}