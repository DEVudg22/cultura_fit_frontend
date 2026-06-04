import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import styles from "./ProductCard.module.css";
import ModalStock from "../Common/ModalStock";

const ProductCard = ({ producto, user }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto, 1);
  };

  return (
    <div className={styles.card}>
      {(user?.role === "admin" && (
        <div className={styles.imageContainer}>
          <img
            src={producto.imagen}
            alt={producto.suplemento}
            className={styles.image}
          />
        </div>
      )) || (
        <Link to={`/product/${producto.id}`}>
          <div className={styles.imageContainer}>
            <img
              src={producto.imagen}
              alt={producto.suplemento}
              className={styles.image}
            />
          </div>
        </Link>
      )}

      <div className={styles.content}>
        {(user?.role === "admin" && (
          <h3 className={styles.title}>{producto.suplemento}</h3>
        )) || (
          <Link to={`/product/${producto.id}`}>
            <h3 className={styles.title}>{producto.suplemento}</h3>
          </Link>
        )}

        <p className={styles.brand}>{producto.marca}</p>
        <p className={styles.presentation}>{producto.presentacion}</p>
        <p
          className={`${styles.stock} ${producto.stock <= 5 ? styles.lowStock : ""}`}
        >
          {producto.stock > 0 ? `Disponibles: ${producto.stock}` : "Agotado"}
        </p>
        <p className={styles.price}>${producto.precio.toFixed(2)} MXN</p>

        {!user && (
          <button
            onClick={handleAddToCart}
            className={styles.addButton}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? "Agotado" : "Agregar al Carrito"}
          </button>
        )}

        {user?.role === "admin" && (
          <ModalStock id={producto.id} price={producto.precio.toFixed(2)} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
