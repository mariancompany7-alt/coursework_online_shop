import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Для автоматичного перенаправлення після успіху

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Відправляємо дані на наш Node.js бекенд
    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess('Реєстрація успішна! Перенаправлення на вхід...');
          setFormData({ name: '', email: '', password: '' });
          // Через 2 секунди перенаправляємо на сторінку входу
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
        <p className={styles.subtitle}>Створіть акаунт, щоб замовляти смачні раціони!</p>

        {error && <div className={styles.errorAlert}>{error}</div>}
        {success && <div className={styles.successAlert}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Ім'я</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ваше ім'я" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Мінімум 6 символів" required />
          </div>

          <button type="submit" className={styles.submitBtn}>Зареєструватися</button>
        </form>

        <p className={styles.footerText}>
          Вже маєте акаунт? <Link to="/login" className={styles.link}>Увійти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;