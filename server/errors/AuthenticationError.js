const AplicationError = require('./AplicationError');

class AuthenticationError extends AplicationError {
    constructor(message){
        super(message,401)
    }
}

module.exports = AuthenticationError;