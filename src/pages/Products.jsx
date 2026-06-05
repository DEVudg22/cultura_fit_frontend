import React, { useState, useEffect } from "react";
import ProductList from "../components/Products/ProductList";
import styles from "./Products.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";
import ModalStock from "../components/Common/ModalStock";

const Products = () => {
  const url = import.meta.env.VITE_API_URL;
  //contexto para renderizado condicional
  const { user, token } = useAuth();
  //hook personalizado para realizar peticiones al servidor
  const { data, loading, error } = useFetch(url + "inventarios");

  //estados locales
  const [searchTerm, setSearchTerm] = useState(""); //estado para capturar la busqueda
  const [resultados, setResultados] = useState([]); //estado para presentar los resultados

  //filtrar los productos
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = data.filter(
      (item) =>
        item.suplemento
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()) ||
        item.marca.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );

    setResultados(filteredData);
  };

  return (
    <div className={styles.container}>
      {(user?.role === "admin" && (
        <h1 className={styles.title}>Administración de Inventario</h1>
      )) || <h1 className={styles.title}>Nuestros Productos</h1>}

      {user?.role === "admin" && (
        <button className={styles.addNewButton}>Agregar nuevo producto</button>
        /*este boton lanzará un modal para capturar el nuevo producto*/
      )}

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Buscar por nombre o marca"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
          disabled={false}
        />
      </div>

      <ProductList
        productos={resultados.length > 0 ? resultados : data}
        loading={loading}
        user={user}
        token={token}
      />
    </div>
  );
};

export default Products;
