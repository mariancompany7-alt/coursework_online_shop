import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';

// Прибираємо пропси cartItems та totalAmount, бо ми беремо їх з роутера
function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Отримуємо дані боксу, які передав компонент Card
  const selectedBox = location.state?.selectedBox;

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', paymentMethod: 'cash', comment: ''
  });

  // Якщо бокс передано, сума дорівнює його ціні. Інакше - 0.
  const [totalAmount, setTotalAmount] = useState(selectedBox ? selectedBox.price : 0);
  const [cartItems, setCartItems] = useState(selectedBox ? [selectedBox] : []);

  useEffect(() => {
    // Якщо користувач потрапив сюди не через кнопку "Замовити", а просто ввів URL
    if (!selectedBox) {
      alert("Кошик порожній! Оберіть бокс у каталозі.");
      navigate('/');
    }
  }, [selectedBox, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Формуємо об'єкт для бекенда (зверни увагу на поля, які очікує Order.js)
    const orderPayload = {
      total_amount: totalAmount,
      delivery_address: { 
        city: "Тернопіль", // Або парсити з formData.address
        street: formData.address 
      },
      // Тут можна додати передачу items, якщо в схемі замовлення є таке поле
    };

    try {
        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
            alert('Дякуємо! Замовлення успішно оформлено.');
            navigate('/dashboard'); 
        } else {
            alert('Помилка при оформленні замовлення.');
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Оформлення замовлення</h1>
        
        <div className={styles.layout}>
          {/* Форма з даними */}
          <form onSubmit={handleSubmit} className={styles.formSection}>
             {/* ... твій попередній код полів форми (Ім'я, Телефон, Адреса тощо) залишається без змін ... */}
            <h2 className={styles.sectionTitle}>1. Дані для доставки</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Ім'я та прізвище отримувача</label>
              <input type="text" id="name" name="name" required placeholder="Введіть повне ім'я" value={formData.name} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Контактний номер телефону</label>
              <input type="tel" id="phone" name="phone" required placeholder="+380" value={formData.phone} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Адреса доставки</label>
              <input type="text" id="address" name="address" required placeholder="Місто, вулиця, будинок, квартира" value={formData.address} onChange={handleChange} />
            </div>

            <h2 className={styles.sectionTitle}>2. Спосіб оплати</h2>
            <div className={styles.formGroup}>
              <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={styles.selectInput}>
                <option value="cash">Готівкою кур'єру при отриманні</option>
                <option value="card">Карткою онлайн на сайті</option>
                <option value="crypto">Криптовалюта (USDT)</option>
              </select>
            </div>

            <h2 className={styles.sectionTitle}>3. Додатково</h2>
            <div className={styles.formGroup}>
              <label htmlFor="comment">Коментар до замовлення</label>
              <textarea id="comment" name="comment" rows="4" placeholder="Побажання щодо часу..." value={formData.comment} onChange={handleChange} />
            </div>
          </form>

          {/* Ваше замовлення (Summary) */}
          <aside className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>Ваше замовлення</h2>
            
            <div className={styles.itemsList}>
              {cartItems.length > 0 ? cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                      <span>{item.price} ₴</span>
                  </div>
              )) : (
                  <p className={styles.emptyCartNotice}>Резюме обраних позицій раціону</p>
              )}
            </div>

            <div className={styles.priceSummary}>
              <div className={styles.summaryRow}>
                <span>Доставка:</span>
                <span className={styles.freeDelivery} style={{ color: '#56ab2f', fontWeight: 'bold' }}>Безкоштовно</span>
              </div>
              <div className={styles.totalRow} style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>
                <span>Разом до сплати:</span>
                <span className={styles.totalPrice}>{totalAmount} ₴</span>
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