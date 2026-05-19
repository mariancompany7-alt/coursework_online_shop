import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', phone: '', password_hash: '' });
  const [loginMethod, setLoginMethod] = useState('email');
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

    const dataToSend = { password_hash: formData.password_hash };
    if (loginMethod === 'email') dataToSend.email = formData.email;
    if (loginMethod === 'phone') dataToSend.phone = formData.phone;

    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess('Вхід успішний! Перенаправлення...');

          // ОБОВ'ЯЗКОВО: Записуємо дані користувача в пам'ять браузера
          localStorage.setItem('user', JSON.stringify(data.user));

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
        <p className={styles.subtitle}>З поверненням! Будь ласка, оберіть спосіб входу.</p>

        <div className={styles.toggleContainer}>
          <div className={`${styles.toggleSlider} ${loginMethod === 'phone' ? styles.sliderRight : ''}`} />
          <button type="button" className={`${styles.toggleBtn} ${loginMethod === 'email' ? styles.activeText : ''}`} onClick={() => setLoginMethod('email')}>
            Через Email
          </button>
          <button type="button" className={`${styles.toggleBtn} ${loginMethod === 'phone' ? styles.activeText : ''}`} onClick={() => setLoginMethod('phone')}>
            Через Телефон
          </button>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}
        {success && <div className={styles.successAlert}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {loginMethod === 'email' ? (
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required />
            </div>
          ) : (
            <div className={styles.inputGroup}>
              <label>Телефон</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+380 99 999 99 99" required />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input type="password" name="password_hash" value={formData.password_hash} onChange={handleChange} placeholder="Введіть ваш пароль" required />
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