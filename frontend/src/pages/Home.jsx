import React, { useEffect, useState } from "react";
import "../App.css";
import Kanban from "../component/Kanban";
import ModalBtn from "../component/ModalBtn";
import { useAuth } from "../context/authContext";
import { useTodo } from "../context/todoContext";

function Home() {
    const [getAllTodos, setGetAllTodos] = useState(() =>
        localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
      );
      const [editTodoID, setEditTodoID] = useState(null);
      const {logout} = useAuth()
      const {todos} = useTodo()
    
    //   useEffect(() => {
    //     localStorage.setItem("todos", JSON.stringify(getAllTodos));
    //   }, [getAllTodos]);
    
      
    //   const deleteTodo = (id) => {
    //     const updatedTodos = getAllTodos.filter((todo) => todo.id !== id);
    //     setGetAllTodos(updatedTodos);
    //   };
    
      
      const editTodo = (id) => {
        setEditTodoID(id);
      };
    
      
    //   const moveTodo = (id, newCategory) => {
    //     const updatedTodos = getAllTodos.map((todo) =>
    //       todo.id === id ? { ...todo, category: newCategory } : todo
    //     );
    //     setGetAllTodos(updatedTodos);
    //     localStorage.setItem("todos", JSON.stringify(updatedTodos));
    //   };
    
      const shiftTodo = (draggedId, targetId) => {
        const updatedTodos = [...getAllTodos];
    
        const draggedIndex = updatedTodos.findIndex((todo) => todo.id === draggedId);
        const targetIndex = updatedTodos.findIndex((todo) => todo.id === targetId);
    
        if (draggedIndex === -1 || targetIndex === -1) return;
    
        const [draggedTodo] = updatedTodos.splice(draggedIndex, 1);
    
        updatedTodos.splice(targetIndex, 0, draggedTodo);
    
        setGetAllTodos(updatedTodos);
    };
  return (
    <>
       <button className="flex items-center justify-center  text-white bg-[#546e65] hover:bg-[#677D6A] w-20 p-2 mt-6 rounded-md font-medium text-[17px] text-center" onClick={logout}>Logout</button>
      <div className="w-full h-[10vh] flex items-center justify-center mt-10">
        <ModalBtn editTodoID={editTodoID} setEditTodoID = {setEditTodoID}/>
      </div>
      <div className="w-full h-auto flex mt-10 justify-center items-center">
        <div className="bg-[#40534C] w-auto h-auto p-6 flex">
          {["To Do", "In Progress", "Done"].map((category) => (
            <Kanban
              key={category}
              title={category}
              todos={todos.filter((todo) => todo.category === category)}
            //   deleteTodo={removeTodo}
              editTodo={editTodo}
            //   moveTodo={moveTodo}
              shiftTodo={shiftTodo}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home