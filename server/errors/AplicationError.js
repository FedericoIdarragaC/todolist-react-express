
class AplicationError extends Error {
    constructor(message, status){
        super(message || 'Something went wrong, please try again');

        Error.captureStackTrace(this,this.constructor);

        this.isOperational = true
        this.status = status || 500;
    }
}

module.exports = AplicationError;