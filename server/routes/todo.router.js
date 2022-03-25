const {Router} = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const requireParams = require('../middlewares/requireParams');
const todoController = require('../controllers/todo.controller');


const todoRouter = Router()

todoRouter.post('/',
    isAuthenticated,
    requireParams(['name','description','statusId']),
    todoController.createToDo);

todoRouter.get('/',
    isAuthenticated,
    todoController.getToDos);

todoRouter.get('/:id',
    isAuthenticated,
    todoController.getToDoById);

todoRouter.put('/:id',
    isAuthenticated,
    requireParams(['name','description','statusId']),
    todoController.updateToDo);

todoRouter.delete('/:id',
    isAuthenticated,
    todoController.deleteToDo);


module.exports = todoRouter;