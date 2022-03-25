const AplicationError = require('./AplicationError');

class NotFound extends AplicationError {
    constructor(message){
        super(message || 'Not Found',404)
    }
}

module.exports = NotFound;