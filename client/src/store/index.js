import { combineReducers, compose, createStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import { watchSagas } from "./sagas";

import authReducer from "./auth/authSlice";
import todosReducer from "./todos/todosSlice";
import statusesReducer from "./statuses/statusesSlice";

let sagaMiddleware = createSagaMiddleware();

const reducer = {
  auth: authReducer,
  todos: todosReducer,
  statuses: statusesReducer,
};

const store = createStore(
  combineReducers(reducer),
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(watchSagas);

export default store;
