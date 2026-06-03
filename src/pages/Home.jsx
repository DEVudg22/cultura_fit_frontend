import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import styles from "./Home.module.css";
import { useFetch } from "../hooks/useFetch";


const Home = () => {
  const { data, loading, error } = useFetch(
    "https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/inventarios",
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Tienda de Suplementos</h1>
          <p>Gracias por visitar este demo de tienda online</p>
          <Link to="/products" className={styles.heroBtn}>
            Nuestro catálogo
          </Link>
        </div>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Te podrían interesar</h2>
        <div className={styles.productGrid}>
          {data
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((producto) => (
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
