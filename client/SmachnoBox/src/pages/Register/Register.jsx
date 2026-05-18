import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', password_hash: '' });
  const [registerMethod, setRegisterMethod] = useState('email'); // 'email' або 'phone'
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

    // Очищаємо непотрібне поле перед відправкою
    const dataToSend = { ...formData };
    if (registerMethod === 'email') delete dataToSend.phone;
    if (registerMethod === 'phone') delete dataToSend.email;

    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess('Реєстрація успішна! Перенаправлення...');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(data.message || 'Щось пішло не так');
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
        <h2>Реєстрація у SmachnoBox</h2>

        {/* Новий плавний перемикач методів реєстрації */}
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
            <label>Ім'я та Прізвище</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Ваше ім'я" required />
          </div>

          {/* Показуємо потрібне поле залежно від вибраного методу */}
          {registerMethod === 'email' ? (
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
            <input type="password" name="password_hash" value={formData.password_hash} onChange={handleChange} placeholder="Мінімум 6 символів" required />
          </div>

          <button type="submit" className={styles.submitBtn}>Зареєструватися</button>
        </form>

        <p className={styles.footerText}>Вже маєте акаунт? <Link to="/login" className={styles.link}>Увійти</Link></p>
      </div>
    </div>
  );
}

export default Register;