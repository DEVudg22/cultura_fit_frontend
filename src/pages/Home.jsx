import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInventario } from '../services/productService';
import ProductCard from '../components/Products/ProductCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import styles from './Home.module.css';

const Home = () => {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestacados();
  }, []);

  const loadDestacados = async () => {
    try {
      setLoading(true);
      const data = await getInventario();
      setDestacados(data.slice(0, 4));
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Cultura Fit</h1>
          <p>Tu tienda de suplementos de confianza en Autlán de Navarro</p>
          <Link to="/products" className={styles.heroBtn}>
            Ver Productos
          </Link>
        </div>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Productos Destacados</h2>
        <div className={styles.productGrid}>
          {destacados.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link to="/products" className={styles.viewAllBtn}>
            Ver todos los productos →
          </Link>
        </div>
      </section>

      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>¿Por qué comprar con nosotros?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🚚</div>
            <h3>Envíos Rápidos</h3>
            <p>Entregas en 24-48 horas en la región</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>✨</div>
            <h3>Productos Originales</h3>
            <p>Garantía de autenticidad en todos los productos</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>💳</div>
            <h3>Pago Seguro</h3>
            <p>Transacciones protegidas con encriptación</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🎯</div>
            <h3>Atención Personalizada</h3>
            <p>Asesoría de expertos en nutrición deportiva</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;