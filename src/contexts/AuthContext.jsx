// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authService, getCurrentUserData } from "../services/authService";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    const currentUser = getCurrentUserData();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.status) {
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(response.message);
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || "Error al registrarse");
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.status) {
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success(response.message);
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
      return { success: false, error: error.message };
    }
  };

  /*const login = async (email, password) => {
    const response = await axios
      .post(
        "https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/login",
        {
          email: email,
          password: password,
        },
      )
      .then((res) => {
        setToken(res.token);
        setIsAuthenticated(true);
        toast.success("bienvenido de nuevo");
        alert("inicio de sesion correcto");
      })
      .catch((error) => {
        toast.error(error.message || "Error al iniciar sesión");
        alert("no fue posible iniciar sesion");
      });
  };*/

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Sesión cerrada correctamente");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, token, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
