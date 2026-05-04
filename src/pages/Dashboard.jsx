// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { saleService } from "../services/saleService";
import { authService } from "../services/authService";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ventas");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // CARGAR VENTAS usando el objeto saleService
      const ventasData = await saleService.getVentas();
      setVentas(Array.isArray(ventasData) ? ventasData : []);

      // CARGAR USUARIOS usando el objeto authService
      const usuariosData = await authService.getUsers();
      setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
    } catch (error) {
      console.error("Error al cargar datos en el dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

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
                    {v.cliente?.nombre} {v.cliente?.paterno}
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
