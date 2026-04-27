import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2026 Cultura Fit - Todos los derechos reservados</p>
        <p>Av. Carlos Santana 336, Autlán de Navarro, Jalisco</p>
        <p>📞 (317) 123-4567 | ✉️ contacto@culturafit.com</p>
      </div>
    </footer>
  );
};

export default Footer;