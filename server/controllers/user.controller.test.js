const sinon = require('sinon');

const userController = require('./user.controller');
const { User } = require('../models');
const AuthenticationError = require('../errors/AuthenticationError');
const NotFound = require('../errors/NotFound');

describe('User Controller ', () => {
    let req = {}
    let res = {}
    describe('register', () => {
        beforeEach(()=>{
            req = {
                body:{
                    username:'newuser23',
                    email:'newuser@gmail.com',            
                    password:'todo2022'
                },
                session:{}
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            } 
        });
        const expectedResult = {
            username:'newuser23',
            password:'jeuf783' 
        }
        
        it('should return created user object',async ()=>{
            const create = sinon.stub(User,'create');
            create.resolves(expectedResult)

            await userController.registerUser(req,res);

            sinon.assert.calledWith(create,req.body);
            sinon.assert.calledOnce(res.send)
            sinon.assert.calledWith(res.send,expectedResult);

            create.restore();
        });

    });

    describe('login', () => {
        let user = {}
        beforeEach(()=>{
            req = {
                body:{
                    username:'newuser23',            
                    password:'todo2022'
                },
                session:{
                    userId:2
                }
            }
            res = {
                send: sinon.spy()
            } 
        });
        it('should return status success on compare password true',async ()=>{
            const findOne = sinon.stub(User,'findOneByUsername');

            user = {
                comparePassword: sinon.stub().returns(true)
            }
            findOne.resolves(user);

            await userController.loginUser(req,res);

            sinon.assert.calledWith(findOne,req.body.username);           
            sinon.assert.calledWith(res.send,{
                status:'success'
            });            

            findOne.restore();
        });

        it('should return authentication error on compare password false',async ()=>{
            const findOne = sinon.stub(User,'findOneByUsername');

            user = {
                comparePassword: sinon.stub().returns(false)
            }
            findOne.resolves(user);

            try {
                await userController.loginUser(req,res);
            } catch (error) {
                expect(error).toBeInstanceOf(AuthenticationError);  
            }

            sinon.assert.calledWith(findOne,req.body.username);           
            
            findOne.restore()
        });

        it('should return not found error on user not found',async ()=>{
            const findOne = sinon.stub(User,'findOneByUsername');

            findOne.resolves(false);
            
            try {
                await userController.loginUser(req,res);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFound);  
            }

            sinon.assert.calledWith(findOne,req.body.username);           
            
            findOne.restore()
        });
    });

    describe('logout', () => {
        beforeEach(()=>{
            req = {
                session: {
                    destroy: sinon.spy()
                }
            }
            res = {
                send: sinon.spy(),
            } 
        });
        it('should response status success and destry session',async ()=>{
            await userController.logoutUser(req,res);

            sinon.assert.calledOnce(req.session.destroy);
            sinon.assert.calledWith(res.send,{
                status:'success'
            });
        })
    })
});
