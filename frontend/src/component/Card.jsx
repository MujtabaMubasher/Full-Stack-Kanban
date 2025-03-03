import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useTodo } from "../context/todoContext";

function Card({ todo, editTodo, onDragStart, onDrop }) {
  if (!todo) return null;
  const {removeTodo} = useTodo()
  //console.log(todo)
   
  return (
    <div
      className="text-[#c9c8c8] shadow-[0_4px_20px_rgba(0,0,0,0.6)] mt-4 p-4 py-6 pt-8 bg-[#1A3636] rounded-lg cursor-grab transition-all duration-200 hover:shadow-lg"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("todoId", todo.id);
        onDragStart(e, todo);
      }}
      onDrop={(e) => onDrop(e, todo)}
    >
      
      {todo.priority && (
        <div className="relative flex justify-center">
          <span className="absolute rounded-sm px-3 py-[3px] text-black text-[11px] font-bold bg-[#D6BD98] top-[-30px] whitespace-nowrap">
            {todo.priority}
          </span>
        </div>
      )}

      <div className="flex justify-between items-start">
        <h2 className="text-[20px] font-bold">{todo.ticketName}</h2>
        <div className="flex gap-2">
        
          <button
            className="cursor-pointer hover:text-[#D6BD98] transition-colors duration-150"
            onClick={() => editTodo(todo._id)}
          >
            <CiEdit />
          </button>
        
          <button
            className="cursor-pointer hover:text-[#D6BD98] transition-colors duration-150"
            onClick={() => removeTodo(todo._id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <hr className="mt-[2px] border-gray-600" />
      <p className="text-[13px] mt-2 text-justify">{todo.ticketDescription}</p>
    </div>
  );
}

export default Card;
