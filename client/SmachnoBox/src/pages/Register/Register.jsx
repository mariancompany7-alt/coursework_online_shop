import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', password_hash: '', city: '', street: '', building: '', apartment: '' });
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

    const dataToSend = { ...formData };
    if (registerMethod === 'email') delete dataToSend.phone;
    if (registerMethod === 'phone') delete dataToSend.email;

    // Build addresses array for backend schema
    const { city, street, building, apartment } = formData;
    if (city || street || building || apartment) {
      dataToSend.addresses = [{ city: city || '', street: street || '', building: building || '', apartment: apartment || '', is_default: true }];
    }
    // remove individual address pieces from root
    delete dataToSend.city; delete dataToSend.street; delete dataToSend.building; delete dataToSend.apartment;

    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Save token and user so newly registered user is considered logged in
          try {
            if (data.token) localStorage.setItem('token', data.token);
            if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
          } catch (err) {
            console.warn('Could not write to localStorage', err);
          }
          setSuccess('Реєстрація успішна! Ви залогінені. Перенаправлення...');
          setTimeout(() => navigate('/dashboard'), 1200);
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

        <div className={styles.toggleContainer}>
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

          <h4 style={{ marginTop: 12 }}>Адреса (необов'язково)</h4>
          <div className={styles.inputGroup}>
            <label>Місто</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Місто" />
          </div>
          <div className={styles.inputGroup}>
            <label>Вулиця</label>
            <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Вулиця" />
          </div>
          <div className={styles.inputGroup}>
            <label>Будинок</label>
            <input type="text" name="building" value={formData.building} onChange={handleChange} placeholder="Будинок" />
          </div>
          <div className={styles.inputGroup}>
            <label>Квартира</label>
            <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Квартира (опційно)" />
          </div>

          <button type="submit" className={styles.submitBtn}>Зареєструватися</button>
        </form>

        <p className={styles.footerText}>Вже маєте акаунт? <Link to="/login" className={styles.link}>Увійти</Link></p>
      </div>
    </div>
  );
}

export default Register;