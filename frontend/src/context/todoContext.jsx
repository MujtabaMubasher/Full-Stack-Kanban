import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const TodoContext = createContext();

const API_URL = "http://localhost:8000/api/v1"

export const TodoProvider = ({ children }) => {
  const { user, userId } = useAuth();
  const [todos, setTodos] = useState([]);
  const [activityLogs, setActivityLoga, ] = useState([])
  
  //console.log(userId);
  
  useEffect(() => {
    if (user) {
      fetchTodos();
      fetchActivityLogs(userId)
      
    } else {
      setTodos([]);
    }
  }, [user]);

  useEffect(()=>{
    //console.log(user);
    
    
  },[])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos/getall`, { withCredentials: true });
      setTodos(response.data.data);
      //console.log("From Fetch All todos ",response.data.data);
      //console.log(todos);
      
      
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const addTodo = async (todoData) => {
    if (!user) return alert("You must be logged in to add a todo");
    const response = await axios.post(`${API_URL}/todos/create`, todoData, { withCredentials: true });
    //console.log(response.data.data)
    setTodos([...todos, response.data.data]);
    //console.log(todos)
  };

  const removeTodo = async (id) => {
    if (!user) return alert("You must be logged in to delete a todo");
    console.log(id)
    const response = await axios.delete(`${API_URL}/todos/delete/${id}`, { withCredentials: true });
    //console.log(response.data.success)
    if (response.data.success) {
        setTodos(todos.filter(todo => todo._id !== id));
    }
  };

  const editTodo = async (id, editData) => {
    if (!user) return alert("You must be logged in to delete a todo");
    console.log(id)
    const response = await axios.put(`${API_URL}/todos/update/${id}`, editData, { withCredentials: true });
    //console.log(response)
    if (response.data.success) {
        fetchTodos();
    }
  };

  const moveTodo = async (id, newCategory) => {
    if (!user) return alert("You must be logged in to move a todo");
    try {
      const response = await axios.put(
        `${API_URL}/todos/move/${id}`,
        { category: newCategory },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, category: newCategory } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error moving todo:", error);
    }
  };

  const shiftTodo = (draggedId, targetId) => {
    const updatedTodos = [...todos];

    const draggedIndex = updatedTodos.findIndex((todo) => todo.id === draggedId);
    const targetIndex = updatedTodos.findIndex((todo) => todo.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [draggedTodo] = updatedTodos.splice(draggedIndex, 1);

    updatedTodos.splice(targetIndex, 0, draggedTodo);

    setTodos(updatedTodos);
};

  const fetchActivityLogs = async (userID) => {
     try {
       const {data} =  await axios.get( `${API_URL}/todos/activitylogs/${userID}`, { withCredentials: true })
       //console.log(data.activityLogs)
       if (data) {
        setActivityLoga(data.activityLogs)
       }
     } catch (error) {
      console.log("Error in fetching the activity logs", error)
     }
  }
  

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, editTodo, moveTodo, shiftTodo, activityLogs }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
