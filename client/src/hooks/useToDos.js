import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStatuses } from "../store/statuses/statusesSelector";

import { useAlert } from "react-alert";

import { actions } from "../store/todos/todosSlice";
import { actions as statusActions } from "../store/statuses/statusesSlice";
import { getTodos, getError } from "../store/todos/todosSelector";

const useToDos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const error = useSelector(getError);
  const statuses = useSelector(getStatuses);

  const alert = useAlert();

  useEffect(() => {
    dispatch(actions.getToDosStarted());
    dispatch(statusActions.getStatusesStarted());
  }, [dispatch]);

  useEffect(() => {
    error && alert.show(error);
  }, [error]);

  return {
    todos,
    error,
    statuses,
    getTodos() {
      dispatch(actions.getToDosStarted());
    },
    getTodosByStatus(statusName) {
      return todos.filter((todo) => todo.status.name === statusName);
    },
    createTodo(todo) {
      dispatch(actions.createToDoStarted(todo));
    },
    updateTodo(todo) {
      dispatch(actions.updateToDoStarted(todo));
    },
    deleteTodo(id) {
      dispatch(actions.deleteToDoStarted(id));
    },
  };
};

export default useToDos;
