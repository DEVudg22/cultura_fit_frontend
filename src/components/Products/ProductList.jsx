import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ productos, loading, user, token }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto} user={user} token={token} />
      ))}
    </div>
  );
};

export default ProductList;