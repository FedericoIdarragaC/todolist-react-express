const { ToDo } = require('../models');
const NotFound = require('../errors/NotFound');

exports.createToDo = async (req,res)=>{
    const {name,description,statusId} = req.body;
    const { userId } = req.session;

    const todo = await ToDo.create({name,description,statusId,userId});
    
    res.send(todo);
}

exports.getToDos = async (req,res)=>{
    const { userId }  = req.session;  
    
    const todos = await ToDo.getTodosByUser(userId);

    res.send(todos);
}

exports.getToDoById = async (req,res)=>{
    const {id} = req.params
    const { userId }  = req.session;  
    
    const todos = await ToDo.getTodosById(id,userId);

    if(!todos){
        throw new NotFound('Todo not found')
    }

    res.send(todos);
}

exports.updateToDo = async (req,res)=>{
    const {id} = req.params;
    const todo = req.body;
    const { userId } = req.session;

    const [todoN] = await ToDo.updateToDo(id,userId,todo)

    if(!todoN){
        throw new NotFound('Todo not found')
    }

    res.send({
        status:'success'
    });
}

exports.deleteToDo = async (req,res)=>{
    const {id} = req.params;
    const { userId } = req.session;

    const todo = await ToDo.deleteToDo(id,userId)
    
    if(!todo){
        throw new NotFound('Todo not found')
    }

    res.send({
        status:'success'
    });
}