import { createSlice,createAction } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    error:''
}

const todosSlice = createSlice({
    name:'todos',
    initialState,
    reducers:{
        getToDosSuccess(state, {payload}){
            state.todos = payload
            state.error = ''
        },
        getToDosFailed(state, {payload}){
            state.error = payload.error
        }
    }
})

const getToDosStarted = createAction('GET_TODOS_STARTED');
const createToDoStarted = createAction('CREATE_TODO_STARTED');
const updateToDoStarted = createAction('UPDATE_TODO_STARTED');
const deleteToDoStarted = createAction('DELETE_TODO_STARTED');


export const actions = {...todosSlice.actions,getToDosStarted,createToDoStarted,updateToDoStarted,deleteToDoStarted};

export default todosSlice.reducer;