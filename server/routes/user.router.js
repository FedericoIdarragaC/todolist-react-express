const {Router} = require('express');

const IsAuthenticated = require('../middlewares/isAuthenticated');
const requireParams = require('../middlewares/requireParams');
const userController = require('../controllers/user.controller')

const userRouter = Router();

userRouter.post('/register',
    requireParams(['username','email','password']),
    userController.registerUser);

userRouter.post('/login',
    requireParams(['username','password']),
    userController.loginUser);

userRouter.post('/logout',
    IsAuthenticated,
    userController.logoutUser);

userRouter.get('/checkauth',
    IsAuthenticated,
    userController.checkAuth);


// userRouter.get('/authenticated',(req,res)=>{
//     console.log(req.session);
//     res.status(200).send(req.session);
// })

module.exports = userRouter;