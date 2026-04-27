// src/services/saleService.js
import { getVentas, guardarVenta, getProductos } from './mockService';

export const getVentasService = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getVentas());
    }, 300);
  });
};

export const createVenta = async (ventaData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const productosInventario = getProductos();
        
        // Validar stock
        for (const item of ventaData.productos) {
          const producto = productosInventario.find(p => p.id === parseInt(item.id_producto));
          if (!producto || producto.stock < item.cantidad) {
            return reject({ message: `Stock insuficiente para ${producto?.suplemento || 'un producto'}` });
          }
        }
        
        // CORRECCIÓN: Asegurar que la estructura del cliente sea la que espera el Dashboard
        const nuevaVenta = {
          fecha: ventaData.fecha || new Date().toISOString().split('T')[0],
          hora: ventaData.hora || new Date().toLocaleTimeString(),
          cliente: { ...ventaData.cliente }, // Toma el objeto cliente completo
          total_general: ventaData.productos.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0),
          productos: ventaData.productos
        };
        
        const ventaGuardada = guardarVenta(nuevaVenta);
        resolve({
          success: "true",
          message: "Pedido realizado con éxito",
          folio_pedido: ventaGuardada.id
        });
      } catch (error) {
        reject({ message: 'Error al procesar la venta' });
      }
    }, 800);
  });
};

export const saleService = {
  getVentas: getVentasService,
  createVenta
};