const sinon = require('sinon');

const todoController = require('./todo.controller');
const { ToDo } = require('../models');
const NotFound = require('../errors/NotFound');

describe('ToD Controller', ()=>{
    let req = {};
    let res = {};
    describe('create',()=>{
        beforeEach(()=>{
            req = {
                session:{
                    userId:1
                },
                body:{
                    name:'ToDo Test',
                    description:'description test',
                    statusId:4
                }
            }
            res = {
                send: sinon.spy()
            }
        });
        const expectedResult = {
            name:'ToDo Test',
            description:'description test',
            userId:1,
            statusId:{
                name:'done'
            }
        }
        it('should return a created object',async ()=>{
            const create = sinon.stub(ToDo,'create');
            create.resolves(expectedResult);

            await todoController.createToDo(req,res);

            sinon.assert.calledWith(create,{...req.body,userId: req.session.userId});
            sinon.assert.calledWith(res.send,expectedResult);

            create.restore();

        });
    });
    describe('get ToDo by id',()=>{
        beforeEach(()=>{
            req = {
                session:{
                    userId:1
                },
                params:{
                    id:2
                }
            }
            res = {
                send: sinon.spy()
            }
        });
        const expectedResult = {
            name:'ToDo Test',
            description:'description test',
            userId:1,
            statusId:{
                name:'done'
            }
        }
        it('should return a todo object when exists',async ()=>{
            const getToDoById = sinon.stub(ToDo,'getTodosById');
            getToDoById.resolves(expectedResult)

            await todoController.getToDoById(req,res);

            sinon.assert.calledWith(getToDoById,req.params.id,req.session.userId);
            sinon.assert.calledWith(res.send,expectedResult);

            getToDoById.restore();
        });
        it('should throw a not found error when not exists',async ()=>{
            const getToDoById = sinon.stub(ToDo,'getTodosById');
            getToDoById.resolves(false)

            try {
                await todoController.getToDoById(req,res);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFound);  
            }

            sinon.assert.calledWith(getToDoById,req.params.id,req.session.userId);

            getToDoById.restore();
        });
    });

    describe('update ToDo',()=>{
        beforeEach(()=>{
            req = {
                session:{
                    userId:1
                },
                params:{
                    id:2
                },
                body:{
                    name:'ToDo Test',
                    description:'description test',
                    statusId:4
                }
            }
            res = {
                send: sinon.spy()
            }
        });


        it('should return a todo object when exists',async ()=>{
            const updateToDo = sinon.stub(ToDo,'updateToDo');
            updateToDo.resolves([1])

            await todoController.updateToDo(req,res);

            sinon.assert.calledWith(updateToDo,req.params.id,req.session.userId,req.body);
            sinon.assert.calledWith(res.send,{ status: 'success' });

            updateToDo.restore();
        });
        it('should throw a not found error when not exists',async ()=>{
            const updateToDo = sinon.stub(ToDo,'updateToDo');
            updateToDo.resolves([0])

            try {
                await todoController.updateToDo(req,res);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFound);  
            }

            sinon.assert.calledWith(updateToDo,req.params.id,req.session.userId,req.body);

            updateToDo.restore();
        });
    });

    describe('delete ToDo',()=>{
        beforeEach(()=>{
            req = {
                session:{
                    userId:1
                },
                params:{
                    id:2
                }
            }
            res = {
                send: sinon.spy()
            }
        });

        it('should return a todo object when exists',async ()=>{
            const deleteToDo = sinon.stub(ToDo,'deleteToDo');
            deleteToDo.resolves(true)

            await todoController.deleteToDo(req,res);

            sinon.assert.calledWith(deleteToDo,req.params.id,req.session.userId);
            sinon.assert.calledWith(res.send,{status:'success'});

            deleteToDo.restore();
        });
        it('should throw a not found error when not exists',async ()=>{
            const deleteToDo = sinon.stub(ToDo,'deleteToDo');
            deleteToDo.resolves(false)

            try {
                await todoController.deleteToDo(req,res);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFound);  
            }

            sinon.assert.calledWith(deleteToDo,req.params.id,req.session.userId);

            deleteToDo.restore();
        });
    });
});
