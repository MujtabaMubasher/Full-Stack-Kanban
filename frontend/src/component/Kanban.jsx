import React, { useRef } from "react";
import Card from "./Card";
import { useTodo } from "../context/todoContext";

function Kanban({ title, todos, editTodo}) {
    const draggedTodoRef = useRef(null);
    const {moveTodo, shiftTodo} =  useTodo()

    const handleDragStart = (e, todo) => {
        e.dataTransfer.setData("todo", JSON.stringify(todo));
        draggedTodoRef.current = todo;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetTodo) => {
        e.preventDefault();
        const draggedTodo = JSON.parse(e.dataTransfer.getData("todo"));

        if (!draggedTodo) return;

        
        if (targetTodo && draggedTodo.category === title) {
            shiftTodo(draggedTodo._id, targetTodo._id);
        }
        
        else if (draggedTodo.category !== title) {
            moveTodo(draggedTodo._id, title);
        }

        draggedTodoRef.current = null;
    };

    return (
        <div
            className="w-[320px] min-h-[400px] bg-[#677D6A] m-4 rounded-lg px-6 py-6"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, null)}
        >
            <h1 className="text-center text-[25px] font-bold text-white">{title}</h1>
            <div className="flex flex-col gap-5">
                {todos.map((todo) => (
                    <Card
                        key={todo._id} 
                        todo={todo}
                        editTodo={editTodo}
                        draggable
                        onDragStart={(e) => handleDragStart(e, todo)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, todo)}
                        className={`p-4 rounded-lg transition ${
                            draggedTodoRef.current?._id === todo._id ? "bg-gray-300" : "bg-white"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Kanban;
