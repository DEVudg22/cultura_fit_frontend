// src/services/authService.js
import { findUserByEmail, guardarUsuario } from "./mockService";

// Funciones para manejar la persistencia del usuario en el navegador
export const setCurrentUserData = (user) => {
  localStorage.setItem("cultura_fit_user", JSON.stringify(user));
};

export const getCurrentUserData = () => {
  const user = localStorage.getItem("cultura_fit_user");
  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem("cultura_fit_user");
  localStorage.removeItem("cultura_fit_token");
};

export const authService = {
  // Registrar nuevo usuario con validación de duplicados
  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const existingUser = findUserByEmail(userData.email);
          if (existingUser) {
            return reject({
              message: "El correo electrónico ya está registrado",
            });
          }
          const newUser = guardarUsuario(userData);
          setCurrentUserData(newUser);
          resolve({
            status: true,
            user: newUser,
            message: "Usuario registrado con éxito",
          });
        } catch (error) {
          reject({ message: "Error en el servidor al registrar usuario" });
        }
      }, 500);
    });
  },

  async logout() {
    clearAuthData();
    return { status: true };
  },

  // Obtener usuarios para el Dashboard
  async getUsers() {
    return new Promise((resolve) => {
      const usuarios =
        JSON.parse(localStorage.getItem("cultura_fit_usuarios")) || [];
      resolve(usuarios);
    });
  },
};
