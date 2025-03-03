import { useState, useEffect } from "react";
import { useTodo } from "../context/todoContext";

const ModalBtn = ({ editTodoID, setEditTodoID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketName, setTicketName] = useState("");
  // const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const {addTodo, todos, editTodo} =  useTodo()

  useEffect(() => { 
    if (editTodoID) {
      // const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const todoToEdit = todos.find((todo) => todo._id === editTodoID);

      if (todoToEdit) {
        setTicketName(todoToEdit.ticketName);
        // setPriority(todoToEdit.priority);
        setCategory(todoToEdit.category);
        setTicketDescription(todoToEdit.ticketDescription);
        setIsOpen(true);
      }
    }
  }, [editTodoID]);

  const handleEditTodo = (e) => {
    e.preventDefault();

    if (!ticketName || !category || !ticketDescription) {
      alert("Please fill all the fields!");
      return;
    }

    const todoEdit = {
      ticketName,
      category,
      ticketDescription,
    };

    editTodo(editTodoID, todoEdit)

    // const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // const updatedTodos = existingTodos.map((todo) =>
    //   todo.id === editTodoID
    //     ? { ...todo, ticketName, priority, category, ticketDescription }
    //     : todo
    // );

    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditTodoID(null)
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!ticketName || !category || !ticketDescription) {
      alert("Please fill all the fields!");
      return;
    }

    // const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

    const newTodo = {
      ticketName,
      category,
      ticketDescription,
    };

    addTodo(newTodo)

    // const updatedTodos = [...existingTodos, newTodo];
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // setGetAllTodos(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])

    setTicketName("");
    // setPriority("");
    setCategory("");
    setTicketDescription("");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="block text-white bg-[#546e65] hover:bg-[#677D6A] w-28 p-2 rounded-md font-medium text-[17px] text-center"
      >
        Add
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-[#1A3636] bg-opacity-75">
          <div className="relative p-4 w-full max-w-md rounded-lg shadow-sm bg-[#40534C]">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-white">
                {editTodoID ? "Edit Ticket" : "Create New Ticket"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                ✖
              </button>
            </div>
            <form className="p-4" onSubmit={editTodoID ? handleEditTodo : submitHandler}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Ticket Name
                  </label>
                  <input
                    type="text"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg bg-[#677D6A] text-white"
                    placeholder="Type name"
                    required
                  />
                </div>
                {/* <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Priority
                  </label>
                  <select
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg bg-[#677D6A] text-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div> */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Category
                  </label>
                  <select
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg bg-[#677D6A] text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Ticket Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full p-2.5 border-[2px] border-[#1A3636] rounded-lg bg-[#677D6A] text-white"
                    placeholder="Write description here"
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#546e65] hover:bg-[#1A3636] p-2 rounded-md font-medium text-[17px]"
              >
                {editTodoID ? "Edit Ticket" : "Add Ticket"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBtn;
