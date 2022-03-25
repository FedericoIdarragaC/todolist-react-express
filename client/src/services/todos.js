import API from "./api";

const todosService = {
    getTodos(){
        return API.get(`todos`,{
            withCredentials:true
        });
    },
    createTodo(todo){
        return API.post(`todos`,todo,{
            withCredentials:true
        });
    },
    updateTodo(todo){
        return API.put(`todos/${todo.id}`,todo,{
            withCredentials:true
        });
    },
    deleteTodo(id){
        return API.delete(`todos/${id}`,{
            withCredentials:true
        });
    }
}

export default todosService;