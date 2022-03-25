import {takeEvery} from 'redux-saga/effects';
import { checkAuthGen, loginUserGen, logoutUserGen, regiserUserGen } from './authSaga';
import { getStatusesGen } from './statusesSaga';
import { createToDo, deleteTodo, getToDoGen, updateTodo } from './todosSaga';

export function* watchSagas(){
    yield takeEvery('LOGIN_STARTED',loginUserGen);
    yield takeEvery('CHECK_AUTH_STARTED',checkAuthGen);
    yield takeEvery('REGISTER_STARTED',regiserUserGen);
    yield takeEvery('LOGOUT_STARTED',logoutUserGen);

    yield takeEvery('GET_TODOS_STARTED',getToDoGen);

    yield takeEvery('GET_STATUSES_STARTED',getStatusesGen);
    yield takeEvery('CREATE_TODO_STARTED',createToDo);
    yield takeEvery('UPDATE_TODO_STARTED',updateTodo);
    yield takeEvery('DELETE_TODO_STARTED',deleteTodo);

}