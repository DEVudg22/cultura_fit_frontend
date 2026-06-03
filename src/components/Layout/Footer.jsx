import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2026 Tienda de Suplementos - Todos los derechos reservados</p>
        <p>Desarrollado por Fernando Córdova Mendoza</p>
        <p>Este sitio es ficticio y solo sirve para demostración</p>
        <p>Contacto: 📞 (228) 102-2322 | ✉️ clxl.wd22@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;