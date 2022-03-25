import Navbar from "../components/todo-list/navbar";
import ToDoList from "../components/todo-list/todoList";

const Dashboard = () => {
  return (
    <div className="bg-slate-100 absolute h-full w-full">
      <Navbar />
      <ToDoList />
    </div>
  );
};

export default Dashboard;
