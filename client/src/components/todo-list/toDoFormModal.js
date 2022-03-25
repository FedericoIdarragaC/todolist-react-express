import { useState, useEffect } from "react";
import useToDos from "../../hooks/useToDos";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ToDoFormModal = ({
  settings,
  statuses,
  openModal,
  closeModal,
  todoToEdit,
  submit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState(statuses[0].id);

  useEffect(() => {
    if (todoToEdit) {
      setName(todoToEdit.name);
      setDescription(todoToEdit.description);
      setStatusId(todoToEdit.status.id);
    }
  }, [todoToEdit]);

  const submitData = () => {
    submit({
      id: todoToEdit?.id || null,
      name,
      description,
      statusId,
    });
    closeModal();
  };

  const validateData = () => {
    return name.length > 0 && description.length > 0;
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex justify-between border-b">
            <h3 className="toDoFormTitle text-lg font-bold">
              {settings.title}
            </h3>
            <button onClick={closeModal}>x</button>
          </div>
          <div className="flex m-4 justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitData();
              }}
              className=" flex flex-col justify-center w-4/5"
            >
              <input
                className="toDoFormName  border-solid border border-black shadow-md  rounded-md p-2 my-4 h-8 text-lg text"
                placeholder="Name"
                type="text"
                value={name}
                onChange={({ target }) => setName(target.value)}
              ></input>
              <textarea
                className="toDoFormDescription border-solid border border-black shadow-md  rounded-md p-2 my-4 text-lg text"
                placeholder="Description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              ></textarea>
              <select
                className="toDoFormStatus border-solid border capitalize border-black shadow-md rounded-md p-2 my-4 text-lg text"
                onChange={({ target }) => setStatusId(target.value)}
              >
                {statuses.map((status) => {
                  if (status.id === statusId)
                    return (
                      <option className="capitalize" selected value={status.id}>
                        {status.name}
                      </option>
                    );

                  return (
                    <option className="capitalize" value={status.id}>
                      {status.name}
                    </option>
                  );
                })}
              </select>
              <button
                className="toDoFormButton my-4 p-2 bg-green-600 shadow-md hover:shadow-md text-white text-md font-bold rounded-lg "
                type="submit"
                disabled={!validateData()}
              >
                {settings.buttonLabel}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ToDoFormModal;
