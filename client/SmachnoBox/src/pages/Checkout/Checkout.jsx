import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

function Checkout({ cartItems = [], totalAmount = 0 }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логіка відправки POST-запиту на бекенд для створення замовлення
    console.log('Надіслано замовлення:', { ...formData, items: cartItems, totalAmount });
    
    alert('Дякуємо! Замовлення успішно оформлено.');
    navigate('/dashboard'); // Перенаправлення в кабінет після успіху
  };

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Оформлення замовлення</h1>
        
        <div className={styles.layout}>
          {/* Ліва колонка: Форма з даними */}
          <form onSubmit={handleSubmit} className={styles.formSection}>
            <h2 className={styles.sectionTitle}>1. Дані для доставки</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Ім'я та прізвище отримувача</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Введіть повне ім'я"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Контактний номер телефону</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="+380"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Адреса доставки</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Місто, вулиця, будинок, квартира"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <h2 className={styles.sectionTitle}>2. Спосіб оплати</h2>
            <div className={styles.formGroup}>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={styles.selectInput}
              >
                <option value="cash">Готівкою кур'єру при отриманні</option>
                <option value="card">Карткою онлайн на сайті</option>
                <option value="crypto">Криптовалюта (USDT)</option>
              </select>
            </div>

            <h2 className={styles.sectionTitle}>3. Додатково</h2>
            <div className={styles.formGroup}>
              <label htmlFor="comment">Коментар до замовлення (необов'язково)</label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                placeholder="Побажання щодо часу доставки, коду домофону тощо..."
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </form>

          {/* Права колонка: Ваше замовлення (Summary) */}
          <aside className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>Ваше замовлення</h2>
            
            {/* Тут можна зробити маппінг страв, якщо cartItems не порожній */}
            <div className={styles.itemsList}>
              <p className={styles.emptyCartNotice}>Резюме обраних позицій раціону</p>
            </div>

            <div className={styles.priceSummary}>
              <div className={styles.summaryRow}>
                <span>Доставка:</span>
                <span className={styles.freeDelivery}>Безкоштовно</span>
              </div>
              <div className={styles.totalRow}>
                <span>Разом до сплати:</span>
                <span className={styles.totalPrice}>{totalAmount} грн</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
                Підтвердити замовлення
              </button>
              <button type="button" onClick={() => navigate(-1)} className={styles.backButton}>
                Повернутися назад
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;