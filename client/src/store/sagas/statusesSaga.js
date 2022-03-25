import {call, put} from 'redux-saga/effects';
import statusesService from '../../services/statuses';
import { actions } from '../statuses/statusesSlice';

export function *getStatusesGen({payload}){
    try {
        const {data} = yield call(statusesService.getStatuses);
        console.log(data)
        yield put(actions.getStatusesSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.getStatusesFailed({error:error}))
    }
}