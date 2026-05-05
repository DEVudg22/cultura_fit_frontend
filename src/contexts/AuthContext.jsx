// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authService, getCurrentUserData } from "../services/authService";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    const currentUser = getCurrentUserData();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  //registro en el servidor
  const register = async (userData) => {
    const res = await axios.post("https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/create-user", userData)
    .then((res) => {
      alert("usted se ha registrado correctamente en el sistema, proceda a iniciar sesión");
      navigate("/login");
    })
    .catch((e) => {
      console.error(e);
      alert("error de conexión hacia el servidor");
    })
  };


  //login desde el servidor
  const login = async (email, password) => {
   
    const res = await axios
      .post("https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        
          setUser({
            user: res.data.first_name,
            role: res.data.role
          });
          setToken(res.data.token);
          setIsAuthenticated(true);
          toast.success(res.data.message);
          
          localStorage.setItem(
            "user",
            JSON.stringify({ user: res.data.first_name, token: res.data.token, role: res.data.role }),
          );
          
          navigate("/");
              
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Error al iniciar sesión");
        alert('Credenciales inválidas');
       
      });
  };


  //logout desde el server
  const logout = async (token) => {
    const res = await axios
      .get("https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((e) => {
        console.error(`Error al cerrar sesión, descripción: ${e}`);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, token, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
