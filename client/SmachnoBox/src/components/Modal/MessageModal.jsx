import React from 'react';
import styles from './MessageModal.module.css';

export default function MessageModal({ isOpen, title, message, type = 'success', onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={`${styles.modalBox} ${styles[type]}`} 
        onClick={(e) => e.stopPropagation()} // Щоб клік по самій модалці її не закривав
      >
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <button className={styles.btn} onClick={onClose}>
          Зрозуміло
        </button>
      </div>
    </div>
  );
}