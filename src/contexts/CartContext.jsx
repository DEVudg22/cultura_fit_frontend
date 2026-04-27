import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cultura_fit_cart';

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Actualizar localStorage y totales cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    
    const items = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const price = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (producto, cantidad = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === producto.id);
      
      if (existingItem) {
        const nuevaCantidad = existingItem.cantidad + cantidad;
        if (nuevaCantidad > producto.stock) {
          toast.error(`No hay suficiente stock de ${producto.suplemento}`);
          return prevItems;
        }
        toast.success(`Se agregó ${cantidad} más de ${producto.suplemento}`);
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
      } else {
        if (cantidad > producto.stock) {
          toast.error(`No hay suficiente stock de ${producto.suplemento}`);
          return prevItems;
        }
        toast.success(`${producto.suplemento} agregado al carrito`);
        return [...prevItems, { ...producto, cantidad }];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const producto = prevItems.find(item => item.id === productId);
      if (producto && nuevaCantidad > producto.stock) {
        toast.error(`Stock máximo disponible: ${producto.stock}`);
        return prevItems;
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, cantidad: nuevaCantidad } : item
      );
    });
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrito vaciado');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};