import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const selectedBox = location.state?.selectedBox;

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', paymentMethod: 'cash', comment: ''
  });

  // Додаємо стан для кількості наборів (за замовчуванням 1)
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!selectedBox) {
      navigate('/'); 
    }
  }, [selectedBox, navigate]);

  if (!selectedBox) return null;

  // Динамічний підрахунок суми
  const totalAmount = selectedBox.price * quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Функція для зміни кількості
  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      return newQuantity > 0 ? newQuantity : 1; // Забороняємо замовляти менше 1 шт
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const orderPayload = {
      total_amount: totalAmount,
      delivery_address: { 
        city: "Тернопіль", 
        street: formData.address 
      },
      items: [{
        box_id: selectedBox._id,
        quantity: quantity, 
        price: selectedBox.price
      }]
    };

    try {
        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
            navigate('/dashboard'); 
        } else if (res.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            const errorData = await res.json();
            alert(`Помилка: ${errorData.message}`);
        }
    } catch (err) {
        console.error("Помилка мережі:", err);
    }
  };

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Оформлення замовлення</h1>
        
        <div className={styles.layout}>
          {/* Ліва колонка: Форма */}
          <form onSubmit={handleSubmit} className={styles.formSection}>
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

          {/* Права колонка: Резюме */}
          <aside className={styles.summarySection}>
            <h2 className={styles.summaryTitle}>Ваше замовлення</h2>
            
            <div className={styles.itemsList}>
              <div className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{selectedBox.title || selectedBox.name}</span>
                  <span className={styles.itemPrice}>{selectedBox.price} ₴ / набір</span>
                </div>
                
                {/* Блок вибору кількості */}
                <div className={styles.quantityControl}>
                  <button type="button" onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>
            </div>

            <div className={styles.priceSummary}>
              <div className={styles.summaryRow}>
                <span>Доставка:</span>
                <span className={styles.freeDelivery}>Безкоштовно</span>
              </div>
              <div className={styles.totalRow}>
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