// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { saleService } from "../services/saleService";
import { authService } from "../services/authService";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import styles from "./Dashboard.module.css";
import axios from "axios";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ventas");


  useEffect(() => {
    loadVentas();
    loadUsuarios();
  }, []);

  const loadVentas = async () => {
      setLoading(true);
      const res = await axios.get("https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/ventas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },}
       )
      .then((res) => {
        setVentas(res.data);

      }).catch((e) => {
        console.error(e);
        
      }).finally (() => {
      setLoading(false);
    });

  }

    const loadUsuarios = async () => {
      setLoading(true);
      const res = await axios.get("https://app-cebc1114-d7a9-4e24-84f6-4cb3c90eeb6b.cleverapps.io/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },}
       )
      .then((res) => {
        setUsuarios(res.data);

      }).catch((e) => {
        console.error(e);
      
      }).finally (() => {
      setLoading(false);
    });
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel de Administración</h1>
      <p className={styles.welcome}>
        Bienvenido, {user?.first_name || "Admin"}
      </p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "ventas" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("ventas")}
        >
          Ventas ({ventas.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "usuarios" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios ({usuarios.length})
        </button>
      </div>

      {activeTab === "ventas" ? (
        <div className={styles.section}>
          <h2>Historial de Ventas</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id}>
                  <td>#{v.id}</td>
                  <td>{formatDate(v.fecha)}</td>
                  <td>
                    {v.cliente} 
                  </td>
                  <td className={styles.amount}>
                    ${v.total_general?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.section}>
          <h2>Usuarios</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.first_name} {u.last_name}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={styles.badge}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
