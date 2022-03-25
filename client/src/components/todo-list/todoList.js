import { useState } from "react";

import useToDos from "../../hooks/useToDos";

import ToDosByStatus from "./todosByStatus";
import ToDoFormModal from "./toDoFormModal";

const colors = ["#B0BEA9", "#048BA8", "#48BF84", "#F5A65B"];

const ToDoList = () => {
  const {
    todos,
    statuses,
    createTodo,
    updateTodo,
    getTodosByStatus,
    deleteTodo,
  } = useToDos();
  const [createToDo, setCreateToDo] = useState(false);

  const [editToDo, setEditToDo] = useState(false);
  const [todoToEdit, setToDoToEdit] = useState(null);

  // this function is called in todoByStatus
  const openEditToDo = (todo) => {
    setToDoToEdit(todo);
    setEditToDo(true);
  };

  const closeCreateModal = () => {
    setCreateToDo(false);
  };

  const closeEditModal = () => {
    setToDoToEdit(null);
    setEditToDo(false);
  };

  return (
    <div className="flex flex-col m-4">
      <div className="mx-8">
        {statuses.length ? (
          <ToDoFormModal
            settings={{
              title: "Create To Do",
              buttonLabel: "Create",
            }}
            statuses={statuses}
            openModal={createToDo}
            submit={createTodo}
            closeModal={closeCreateModal}
          ></ToDoFormModal>
        ) : (
          ""
        )}
        {statuses.length && editToDo ? (
          <ToDoFormModal
            settings={{
              title: "Edit To Do",
              buttonLabel: "Edit",
            }}
            statuses={statuses}
            openModal={editToDo}
            submit={updateTodo}
            closeModal={closeEditModal}
            todoToEdit={todoToEdit}
          ></ToDoFormModal>
        ) : (
          ""
        )}
        <button
          onClick={() => setCreateToDo(true)}
          className="createToDoButton bg-cyan-500 text-white shadow-md font-semibold p-4 rounded-md"
        >
          Create To Do
        </button>
      </div>
      <div className="flex justify-around m-6">
        {statuses.map((status, index) => (
          <div
            key={status.id}
            className="flex flex-col items-center p-2 h-full w-full shadow-lg mx-2 border-black"
            style={{ backgroundColor: `${colors[index]}` }}
          >
            <h2 className=" capitalize text-xl font-semibold text-gray-100">
              {status.name}
            </h2>
            {todos.length > 0 && (
              <ToDosByStatus
                status={status}
                editToDo={openEditToDo}
                getTodosByStatus={getTodosByStatus}
                deleteTodo={deleteTodo}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
