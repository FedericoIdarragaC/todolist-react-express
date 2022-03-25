const { User } = require('../models');
const NotFound = require('../errors/NotFound');
const AuthenticationError = require('../errors/AuthenticationError');

exports.registerUser = async (req,res) => {
    const {username,email,password} = req.body;

    const user = await User.create({username,email,password});

    req.session.userId = user.id;
    req.session.username = user.username;

    res.send(user)
}

exports.loginUser = async (req,res) => {
    const {username,password} = req.body

    const user = await User.findOneByUsername(username);

    if (user){
        const passwordCorrect = await user.comparePassword(password);

        if(!passwordCorrect)
            throw new AuthenticationError('Incorrect password')

        req.session.userId = user.id;
        req.session.username = user.username;
        res.send({
            status:'success'
        });
    }else{
        throw new NotFound(`User with username ${username} not found`)     
    }

}

exports.logoutUser = (req,res) => {
    
    req.session.destroy();
    res.send({
        status:'success'
    });
}

exports.checkAuth = (req,res) => {
    res.send(req.session)     
}