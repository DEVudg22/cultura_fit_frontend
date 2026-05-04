import { getProductos, getProductoById, searchProductos } from "./mockService";

// Obtener todos los productos
export const getInventario = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getProductos());
    }, 300);
  });
};

// Obtener producto por ID
export const getProductoByIdService = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = getProductoById(id);
      if (producto) {
        resolve(producto);
      } else {
        reject({ message: "Producto no encontrado" });
      }
    }, 200);
  });
};

// Buscar productos
export const searchProductosService = async (termino, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(searchProductos(termino, data));
    }, 300);
  });
};

// Obtener todas las marcas (desde productos)
export const getMarcas = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const productos = getProductos();
      const marcas = [...new Set(productos.map((p) => p.marca))];
      resolve(marcas.map((nombre, index) => ({ id: index + 1, nombre })));
    }, 200);
  });
};

// Obtener todos los suplementos (nombres únicos)
export const getSuplementos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const productos = getProductos();
      const suplementos = productos.map((p) => ({
        id: p.id,
        nombre: p.suplemento,
        marca: p.marca,
      }));
      resolve(suplementos);
    }, 200);
  });
};
