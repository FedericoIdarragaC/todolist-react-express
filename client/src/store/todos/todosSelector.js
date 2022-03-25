export const getTodosByStatus = (status) => ({todos:todos}) => todos.todos.filter((todo) => todo.status.name === status);

export const getTodos = ({todos:todos}) => todos.todos;

export const getError = ({todos:todos}) => todos.error;