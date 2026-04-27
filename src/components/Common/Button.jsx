import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  fullWidth = false 
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;