import {call, put} from 'redux-saga/effects';
import authService from '../../services/auth';
import { actions } from '../auth/authSlice';

export function *loginUserGen({payload}){
    try {
        yield call(authService.loginUser,payload);
        const {data:cookie} = yield call(authService.checkAuth);
        yield put(actions.authenticateSuccess(cookie))
    } catch (error) {
        console.log(error);
        yield put(actions.authenticateFailed({error:error}))
    }
}

export function *regiserUserGen({payload}){
    try {
        yield call(authService.registerUser,payload);
        const {data:cookie} = yield call(authService.checkAuth);
        yield put(actions.authenticateSuccess(cookie))
    } catch (error) {
        console.log(error);
        yield put(actions.authenticateFailed({error:error}))
    }
}

export function *checkAuthGen(){
    try {
        const {data:cookie} = yield call(authService.checkAuth);
        yield put(actions.authenticateSuccess(cookie))
    } catch (error) {
        console.log(error);
        yield put(actions.authenticateFailed({error:error}))
    }
}

export function *logoutUserGen(){
    try {
        yield call(authService.logoutUser);
        yield put(actions.logoutSuccess())
    } catch (error) {
        console.log(error);
        yield put(actions.logoutFailed({error:error}))
    }
}
