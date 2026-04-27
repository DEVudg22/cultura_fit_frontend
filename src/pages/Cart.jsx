import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos!</p>
        <Link to="/products" className={styles.shopBtn}>
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mi Carrito</h1>
      
      <div className={styles.cartGrid}>
        <div className={styles.itemsSection}>
          <div className={styles.headerRow}>
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
          </div>
          
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h3>{item.suplemento}</h3>
                <p>{item.marca} - {item.presentacion}</p>
                <p className={styles.itemPrice}>${item.precio.toFixed(2)}</p>
              </div>
              
              <div className={styles.itemQuantity}>
                <button 
                  onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                  className={styles.qtyBtn}
                >
                  -
                </button>
                <span className={styles.qtyValue}>{item.cantidad}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                  className={styles.qtyBtn}
                  disabled={item.cantidad >= item.stock}
                >
                  +
                </button>
              </div>
              
              <div className={styles.itemSubtotal}>
                ${(item.precio * item.cantidad).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className={styles.removeBtn}
              >
                Eliminar
              </button>
            </div>
          ))}
          
          <button onClick={clearCart} className={styles.clearBtn}>
            Vaciar Carrito
          </button>
        </div>
        
        <div className={styles.summarySection}>
          <h2>Resumen de Compra</h2>
          <div className={styles.summaryRow}>
            <span>Total de productos:</span>
            <span>{totalItems}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total a pagar:</span>
            <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
          </div>
          
          <button onClick={handleCheckout} className={styles.checkoutBtn}>
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;