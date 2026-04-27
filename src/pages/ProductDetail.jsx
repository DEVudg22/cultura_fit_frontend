import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoByIdService } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducto();
  }, [id]);

  const loadProducto = async () => {
    try {
      setLoading(true);
      const data = await getProductoByIdService(id);
      setProducto(data);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
  };

  const handleBuyNow = () => {
    addToCart(producto, cantidad);
    navigate('/cart');
  };

  if (loading) return <LoadingSpinner />;
  if (!producto) return null;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← Volver
      </button>
      
      <div className={styles.productGrid}>
        <div className={styles.imageSection}>
          <img 
            src={`https://via.placeholder.com/400x400?text=${encodeURIComponent(producto.suplemento.substring(0, 15))}`}
            alt={producto.suplemento}
            className={styles.image}
          />
        </div>
        
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{producto.suplemento}</h1>
          <p className={styles.brand}>Marca: {producto.marca}</p>
          <p className={styles.presentation}>Presentación: {producto.presentacion}</p>
          <p className={`${styles.stock} ${producto.stock <= 5 ? styles.lowStock : ''}`}>
            Stock disponible: {producto.stock} unidades
          </p>
          <p className={styles.price}>${producto.precio.toFixed(2)} MXN</p>
          
          <div className={styles.description}>
            <h3>Descripción</h3>
            <p>{producto.descripcion || 'Sin descripción disponible.'}</p>
          </div>
          
          <div className={styles.quantitySection}>
            <label>Cantidad:</label>
            <div className={styles.quantityControls}>
              <button 
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className={styles.qtyBtn}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <span className={styles.qtyValue}>{cantidad}</span>
              <button 
                onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                className={styles.qtyBtn}
                disabled={cantidad >= producto.stock}
              >
                +
              </button>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button 
              onClick={handleAddToCart}
              className={styles.addToCartBtn}
              disabled={producto.stock === 0}
            >
              Agregar al Carrito
            </button>
            <button 
              onClick={handleBuyNow}
              className={styles.buyNowBtn}
              disabled={producto.stock === 0}
            >
              Comprar Ahora
            </button>
          </div>
          
          {producto.stock === 0 && (
            <p className={styles.outOfStock}>Producto agotado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;