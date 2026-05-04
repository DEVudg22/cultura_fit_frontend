import React, { useState, useEffect } from "react";
import ProductList from "../components/Products/ProductList";
import styles from "./Products.module.css";

import { useFetch } from "../hooks/useFetch";

const Products = () => {
  //hook personalizado para realizar peticiones al servidor
  const { data, loading, error } = useFetch(
    "https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/inventarios",
  );

  //estados locales
  const [searchTerm, setSearchTerm] = useState(""); //estado para capturar la busqueda
  const [resultados, setResultados] = useState([]); //estado para presentar los resultados

  //filtrar los productos PENDIENTE
  /*const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filteredData = data.filter((item) => {
      if (!searchTerm.trim()) {
        return data;
      } else {
        return (
          item.suplemento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.marca.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
    /////// otro codigo
    setResultados(filteredData);

    /*const filteredData = data.filter(
      (item) =>
        item.suplemento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.marca.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setResultados(filteredData);
  };*/

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestros Productos</h1>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Buscar por nombre o marca...EN CONSTRUCCION"
          value={searchTerm}
          onChange={""}
          className={styles.searchInput}
          disabled={true}
        />
      </div>

      <ProductList productos={data} loading={loading} />
    </div>
  );
};

export default Products;
