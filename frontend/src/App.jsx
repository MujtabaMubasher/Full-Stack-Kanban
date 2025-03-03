import React, { useEffect, } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import ActivityLogs from "./pages/activityLogs"
import { useAuth } from "./context/authContext";


function App() {
  const { isLoggedIn } = useAuth
  const navigate = useNavigate()
  const location = useLocation()
  //console.log(location.pathname)
  useEffect(()=>{
    if (location.pathname === "/home") {
      // window.location.reload();
      if (!isLoggedIn) {
        navigate("/")
      }
    }
  },[])


  return (
    <>
      <Routes  >
        <Route path='/' element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activitylogs" element={<ActivityLogs />} />
      </Routes>
    </>
  );
}

export default App;
