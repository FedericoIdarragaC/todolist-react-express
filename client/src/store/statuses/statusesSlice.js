import { createSlice,createAction } from "@reduxjs/toolkit";

const initialState = {
    statuses: [],
    error:''
}

const statusesSlice = createSlice({
    name:'statuses',
    initialState,
    reducers:{
        getStatusesSuccess(state, {payload}){
            state.statuses = payload
            state.error = ''
        },
        getStatusesFailed(state, {payload}){
            state.statuses = []
            state.error = payload.error
        }
    }
})

const getStatusesStarted = createAction('GET_STATUSES_STARTED');

export const actions = {...statusesSlice.actions,getStatusesStarted};

export default statusesSlice.reducer;