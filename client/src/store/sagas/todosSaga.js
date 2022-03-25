import {call, put} from 'redux-saga/effects';
import todosService from '../../services/todos';
import { actions } from '../todos/todosSlice';

export function *getToDoGen(){
    try {
        const {data} = yield call(todosService.getTodos);
        yield put(actions.getToDosSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.getToDosFailed({error:error}))
    }
}

export function *createToDo({payload}){
    try {
        yield call(todosService.createTodo,payload);
        const {data} = yield call(todosService.getTodos);
        yield put(actions.getToDosSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.getToDosFailed({error:error}))
    }
}

export function *updateTodo({payload}){
    try {
        yield call(todosService.updateTodo,payload);
        const {data} = yield call(todosService.getTodos);
        yield put(actions.getToDosSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.getToDosFailed({error:error}))
    }
}

export function *deleteTodo({payload}){
    try {
        yield call(todosService.deleteTodo,payload);
        const {data} = yield call(todosService.getTodos);
        yield put(actions.getToDosSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.getToDosFailed({error:error}))
    }
}