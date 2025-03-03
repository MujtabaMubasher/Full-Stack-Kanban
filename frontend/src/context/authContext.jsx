import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = "https://kanbann-backend.onrender.com/api/v1";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);
    const [userId, setUserid] = useState()
    
    
    const navigate = useNavigate()

      useEffect(() => {
        const checkLoginStatus = async () => {
          try {
            const { data } = await axios.get(`${API_URL}/users/getuser`, { withCredentials: true });
            //console.log(data.success);
            if (data.success) {
              //console.log(data.data._id); 
              setUser(data);
              setIsLoggedIn(true)
            }
            setUser(data);
          } catch (error) {
            setUser(null);
            setIsLoggedIn(false)
          } finally {
            setLoading(false);
          }
        };
        checkLoginStatus();
      }, []);


    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, { email, password }, { withCredentials: true });
            //console.log(response.data.success)
            if (response.data.success) {
                setUserid(response.data.data.user._id)
            //    console.log(userId);
                setUser(response.data.data.user);
                setIsLoggedIn(true)
                alert("Login Successfull")
                return response.data.success
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };



    const signup = async (name, email, password) => {
        try {
            const data = await axios.post(`${API_URL}/users/register`, { name, email, password }, { withCredentials: true });
            //console.log(data.data.success)
            if (data.data.success) {
                return true
            }

        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");

        };
    }

    const logout = async () => {
        try {
            const response = await axios.get(`${API_URL}/users/logout`, { withCredentials: true });
            console.log(response.status)
            if (response.status === 200) {
                setUser(null);
                setIsLoggedIn(false)
                alert("Logout Successfull")
                window.location.reload();
                navigate("/")

            }
        } catch (error) {
            alert("Logout failed");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


