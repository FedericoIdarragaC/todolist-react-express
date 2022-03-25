
module.exports = (err,req,res,next) => {
    if(err.isOperational){
        res.status(err.status).send({
            status:'failed',
            message:err.message
        });
    }else{
        console.log(err.stack)
        res.status(500).send({
            status:'failed',
            message:err.message
        });
    }
}