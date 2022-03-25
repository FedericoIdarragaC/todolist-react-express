import useToDos from "../../hooks/useToDos";
import Todo from "./todo";

const ToDosByStatus = ({ status, editToDo, getTodosByStatus, deleteTodo }) => {
  const todos = getTodosByStatus(status.name);

  return (
    <div className="w-full p-2">
      {todos.length > 0 &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onClickDelete={deleteTodo}
            onClickEdit={editToDo}
          />
        ))}
    </div>
  );
};

export default ToDosByStatus;
