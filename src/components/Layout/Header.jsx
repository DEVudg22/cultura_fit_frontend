import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>Cultura Fit</h1>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Inicio</Link>
          <Link to="/products" className={styles.navLink}>Productos</Link>
          
          <Link to="/cart" className={styles.cartLink}>
            🛒 Carrito
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              )}
              <div className={styles.userMenu}>
                <span className={styles.userName}>👤 {user?.first_name}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.navLink}>Iniciar Sesión</Link>
              <Link to="/register" className={styles.registerBtn}>Registrarse</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;