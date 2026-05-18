import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [registerMethod, setRegisterMethod] = useState('email');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Запит на бекенд для авторизації (можна підключити пізніше)
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess('Вхід успішний! Перенаправлення...');
          // Тут можна зберегти токен, наприклад: localStorage.setItem('token', data.token);
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setError(data.message || 'Невірний email або пароль');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Не вдалося з’єднатися з сервером');
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Вхід у SmachnoBox</h2>
        <p className={styles.subtitle}>З поверненням! Будь ласка, введіть свої дані.</p>

        <div className={styles.toggleContainer}>
          {/* Сам зелений повзунок. Додаємо клас sliderRight, якщо вибрано телефон */}
          <div
            className={`${styles.toggleSlider} ${registerMethod === 'phone' ? styles.sliderRight : ''}`}
          />

          <button
            type="button"
            className={`${styles.toggleBtn} ${registerMethod === 'email' ? styles.activeText : ''}`}
            onClick={() => setRegisterMethod('email')}
          >
            Через Email
          </button>

          <button
            type="button"
            className={`${styles.toggleBtn} ${registerMethod === 'phone' ? styles.activeText : ''}`}
            onClick={() => setRegisterMethod('phone')}
          >
            Через Телефон
          </button>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}
        {success && <div className={styles.successAlert}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ваш пароль"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>Увійти</button>
        </form>

        <p className={styles.footerText}>
          Немає акаунту? <Link to="/register" className={styles.link}>Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;