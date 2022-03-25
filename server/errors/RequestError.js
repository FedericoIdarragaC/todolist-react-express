const AplicationError = require('./AplicationError');

class RequestError extends AplicationError{
    constructor(message) {
        super(message,400);
        
    }
}

module.exports = RequestError;