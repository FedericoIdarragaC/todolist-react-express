const Todo = ({ todo, onClickEdit, onClickDelete }) => {
  return (
    <div className="todo my-4 flex flex-col items-start shadow-lg rounded-lg bg-slate-100 w-full">
      <div className=" shadow-md bg-slate-500 w-full h-4 rounded-t-md"></div>
      <div className=" p-4">
        <h3 className=" font-semibold border-b">{todo.name}</h3>
        <p>{todo.description}</p>
      </div>
      <div className="flex w-full justify-end px-1 py-1">
        <button onClick={() => onClickEdit(todo)}>
          <i class="fa-solid fa-pen mx-1"></i>
        </button>
        <button onClick={() => onClickDelete(todo.id)}>
          <i class="fa-solid fa-trash mx-1"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
