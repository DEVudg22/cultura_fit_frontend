import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@culturafit.com"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
            />
          </div>
          
          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        
        <p className={styles.registerLink}>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
        
        <div className={styles.demoCredentials}>
          <p>Cuentas de demostración:</p>
          <p>📧 admin@culturafit.com / admin123 (Admin)</p>
          <p>📧 juan@example.com / 123456 (Usuario)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;