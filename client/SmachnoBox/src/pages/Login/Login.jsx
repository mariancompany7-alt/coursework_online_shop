import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Використовуємо Link для переходу на реєстрацію
import styles from './Login.module.css';

function Login() {
  // Стан для збереження введених даних
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Функція для оновлення стану при введенні тексту
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Функція відправки форми
  const handleSubmit = (e) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки
    console.log('Дані для відправки на сервер:', formData);
    // Тут пізніше будемо робити запит до нашого Node.js бекенду
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Вхід</h2>
        <p className={styles.subtitle}>З поверненням! Будь ласка, введіть свої дані.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введіть ваш email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введіть ваш пароль"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Увійти
          </button>
        </form>

        <div className={styles.footer}>
          <p>Немає акаунту? <Link to="/register" className={styles.link}>Зареєструватися</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;