import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductoByIdService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import styles from "./ProductDetail.module.css";
import { useFetch } from "../hooks/useFetch";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  const { data, loading, error } = useFetch(
    `https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/inventarios/${id}`,
  );

  console.log(data);

  /*useEffect(() => {
    loadProducto();
  }, [id]);

  const loadProducto = async () => {
    try {
      setLoading(true);
      const data = await getProductoByIdService(id);
      setProducto(data);
    } catch (error) {
      console.error("Error al cargar producto:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };*/

  const handleAddToCart = () => {
    addToCart(data, cantidad);
  };

  const handleBuyNow = () => {
    addToCart(data, cantidad);
    navigate("/cart");
  };

  if (loading) return <LoadingSpinner />;
  if (!data) return null;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← Volver
      </button>

      <div className={styles.productGrid}>
        <div className={styles.imageSection}>
          <img
            src={data.imagen}
            alt={data.suplemento}
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{data.suplemento}</h1>
          <p className={styles.brand}>Marca: {data.marca}</p>
          <p className={styles.presentation}>
            Presentación: {data.presentacion}
          </p>
          <p
            className={`${styles.stock} ${data.stock <= 5 ? styles.lowStock : ""}`}
          >
            Stock disponible: {data.stock} unidades
          </p>
          <p className={styles.price}>${data.precio.toFixed(2)} MXN</p>

          <div className={styles.description}>
            <h3>Descripción</h3>
            <p>{data.descripcion || "Sin descripción disponible."}</p>
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
                onClick={() => setCantidad(Math.min(data.stock, cantidad + 1))}
                className={styles.qtyBtn}
                disabled={cantidad >= data.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleAddToCart}
              className={styles.addToCartBtn}
              disabled={data.stock === 0}
            >
              Agregar al Carrito
            </button>
            <button
              onClick={handleBuyNow}
              className={styles.buyNowBtn}
              disabled={data.stock === 0}
            >
              Comprar Ahora
            </button>
          </div>

          {data.stock === 0 && (
            <p className={styles.outOfStock}>Producto agotado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
