// Servicio base para manejar datos mock
import productosData from "../mock/productos.json";
import usuariosData from "../mock/usuarios.json";
import ventasData from "../mock/ventas.json";

// Clave para localStorage
const STORAGE_KEYS = {
  USUARIOS: "cultura_fit_usuarios",
  VENTAS: "cultura_fit_ventas",
  CURRENT_USER: "cultura_fit_user",
  TOKEN: "cultura_fit_token",
};

// Inicializar datos en localStorage si no existen
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USUARIOS)) {
    localStorage.setItem(
      STORAGE_KEYS.USUARIOS,
      JSON.stringify(usuariosData.usuarios),
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.VENTAS)) {
    localStorage.setItem(
      STORAGE_KEYS.VENTAS,
      JSON.stringify(ventasData.ventas),
    );
  }
};

initializeStorage();

// Obtener productos (solo lectura, viene del JSON estático)
export const getProductos = () => {
  return productosData.productos;
};

export const getProductoById = (id) => {
  return productosData.productos.find((p) => p.id === parseInt(id));
};

export const searchProductos = (termino, data) => {
  //const productos = getProductos();
  if (!termino.trim()) return /*productos*/ data;

  const terminoLower = termino.toLowerCase();
  return /*productos*/ data.filter(
    (p) =>
      p.suplemento.toLowerCase().includes(terminoLower) ||
      p.marca.toLowerCase().includes(terminoLower) ||
      p.descripcion.toLowerCase().includes(terminoLower),
  );
};

// Obtener usuarios (desde localStorage)
export const getUsuarios = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USUARIOS));
};

export const guardarUsuario = (usuario) => {
  const usuarios = getUsuarios();
  const nuevoId = Math.max(...usuarios.map((u) => u.id), 0) + 1;
  const nuevoUsuario = { ...usuario, id: nuevoId, role: "user" };
  usuarios.push(nuevoUsuario);
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
  return nuevoUsuario;
};

export const findUserByEmail = (email) => {
  const usuarios = getUsuarios();
  return usuarios.find((u) => u.email === email);
};

// Obtener ventas (desde localStorage)
export const getVentas = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.VENTAS));
};

export const guardarVenta = (venta) => {
  const ventas = getVentas();
  const nuevoId =
    ventas.length > 0 ? Math.max(...ventas.map((v) => v.id)) + 1 : 1;
  const nuevaVenta = { ...venta, id: nuevoId };
  ventas.push(nuevaVenta);
  localStorage.setItem(STORAGE_KEYS.VENTAS, JSON.stringify(ventas));
  return nuevaVenta;
};

// Autenticación
export const setCurrentUser = (user, token) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// Generar token simulado
export const generateToken = (user) => {
  return `mock_token_${user.id}_${Date.now()}`;
};
