import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { createVenta } from "../services/saleService";
import toast from "react-hot-toast";
import styles from "./Checkout.module.css";
import { usePost } from "../hooks/usePost";

const Checkout = () => {
  const { data, loading, error, postData } = usePost(
    "https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/ventas",
  );
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    paterno: "",
    materno: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.paterno) {
      toast.error("Nombre y apellido paterno son obligatorios");
      return;
    }

    try {
      const fecha = new Date();
      // CORRECCIÓN: Estructurar los datos para que coincidan con saleService y Dashboard
      const ventaData = {
        nombre: formData.nombre,
        paterno: formData.paterno,
        materno: formData.materno,
        fecha: fecha.toISOString().split("T")[0],
        hora: fecha.toTimeString().split(" ")[0],
        productos: cartItems.map((item) => ({
          id_producto: item.id,
          cantidad: item.cantidad,
        })),
      };

      /*const response = await createVenta(ventaData) postData(ventaData);

      if (response.success === "true") {
        toast.success(
          `Pedido realizado con éxito! Folio: ${response.folio_pedido}`,
        );
        clearCart();
        navigate("/");
      } else {
        toast.error("Error al procesar la venta");
      }*/
    const response = await  postData(ventaData);
    alert("pedido realizado con éxito");
    clearCart();
    navigate("/");

    } catch (error) {
      console.error("Error en checkout:", error);
      toast.error(error.message || "Error al procesar la venta");
      alert("error de servidor");
    }
  };

  if (cartItems.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalizar Compra</h1>

      <div className={styles.checkoutGrid}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Datos del Cliente</h2>

          <div className={styles.formGroup}>
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Apellido Paterno *</label>
            <input
              type="text"
              name="paterno"
              value={formData.paterno}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Apellido Materno</label>
            <input
              type="text"
              name="materno"
              value={formData.materno}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={(e) => console.log(data)}
            className={styles.submitBtn}
          >
            {loading
              ? "Procesando..."
              : `Confirmar Pedido - $${totalPrice.toFixed(2)}`}
          </button>
        </form>

        <div className={styles.orderSummary}>
          <h2>Resumen del Pedido</h2>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <span>
                {item.suplemento} x {item.cantidad}
              </span>
              <span>${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
          ))}
          <div className={styles.total}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
