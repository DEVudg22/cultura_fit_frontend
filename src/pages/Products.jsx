import React, { useState, useEffect } from 'react';
import { getInventario, searchProductosService } from '../services/productService';
import ProductList from '../components/Products/ProductList';
import styles from './Products.module.css';

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await getInventario();
      setProductos(data);
      setFilteredProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProductos(productos);
    } else {
      try {
        const results = await searchProductosService(term);
        setFilteredProductos(results);
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setFilteredProductos([]);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestros Productos</h1>
      
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      
      <ProductList productos={filteredProductos} loading={loading} />
    </div>
  );
};

export default Products;