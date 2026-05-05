import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    second_surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es obligatorio';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido paterno es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico no válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    const result = await register({
      first_name: formData.first_name,
      last_name: formData.last_name,
      second_surname: formData.second_surname,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre *</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={errors.first_name ? styles.errorInput : ''}
            />
            {errors.first_name && <span className={styles.errorMsg}>{errors.first_name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label>Apellido Paterno *</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={errors.last_name ? styles.errorInput : ''}
            />
            {errors.last_name && <span className={styles.errorMsg}>{errors.last_name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label>Apellido Materno</label>
            <input
              type="text"
              name="second_surname"
              value={formData.second_surname}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Correo Electrónico *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ''}
            />
            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.errorInput : ''}
            />
            {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label>Confirmar Contraseña *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? styles.errorInput : ''}
            />
            {errors.confirmPassword && <span className={styles.errorMsg}>{errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" disabled={loading} className={styles.registerBtn}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <p className={styles.loginLink}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;