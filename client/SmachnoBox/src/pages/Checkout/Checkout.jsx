import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';
import MessageModal from '../../components/Modal/MessageModal'; // Імпортуємо наш спільний компонент модалки

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cartItem, setCartItem] = useState(location.state?.selectedBox || null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Єдиний стан для управління нашою модалкою (успіх або помилка)
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: '', redirect: false });

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', paymentMethod: 'cash', comment: '',
    cardNumber: '', expiryDate: '', cvv: ''
  });

  // Обробка порожнього кошика
  if (!cartItem) {
    return (
      <main className={styles.checkoutPage} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', backgroundColor: '#303030', padding: '40px', borderRadius: '16px', border: '1px solid #4a4a4a' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Ваш кошик порожній 🛒</h2>
          <p style={{ color: '#aaa', marginBottom: '25px' }}>Оберіть план харчування у нашому каталозі.</p>
          <button className={styles.submitButton} onClick={() => navigate('/')}>Перейти до каталогу</button>
        </div>
      </main>
    );
  }

  const totalAmount = cartItem.price * quantity;

  // Форматування полів картки
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.substring(0, 19) }));
      return;
    }
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.substring(0, 5) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleRemoveItem = () => setCartItem(null);

  // Головна функція відправки
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Перевірка банківської картки, якщо обрана
    if (formData.paymentMethod === 'card') {
      if (formData.cardNumber.length < 19 || formData.expiryDate.length < 5 || formData.cvv.length < 3) {
        setModal({
            isOpen: true,
            title: 'Помилка даних',
            message: 'Будь ласка, введіть коректні дані платіжної картки.',
            type: 'error',
            redirect: false
        });
        return;
      }
    }

    setIsProcessing(true);

    // Імітація обробки платежу
    const processPayment = new Promise(resolve => {
      setTimeout(() => resolve(true), 1500);
    });
    await processPayment;

    const token = localStorage.getItem('token');
    
    const orderPayload = {
      total_amount: totalAmount,
      delivery_address: { city: "Тернопіль", street: formData.address },
      payment_method: formData.paymentMethod,
      payment_status: formData.paymentMethod === 'card' ? 'paid' : 'pending',
      items: [{
        box_id: cartItem._id,
        quantity: quantity, 
        price: cartItem.price
      }]
    };

    try {
        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
            // Успішне замовлення
            setModal({
                isOpen: true,
                title: 'Успішно!',
                message: 'Ваше замовлення успішно оформлено! Дякуємо, що обрали SmachnoBox.',
                type: 'success',
                redirect: true // Вказує, що після закриття треба перейти в дашборд
            });
        } else if (res.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            const errorData = await res.json();
            setModal({
                isOpen: true,
                title: 'Помилка замовлення',
                message: `Помилка: ${errorData.message}`,
                type: 'error',
                redirect: false
            });
        }
    } catch (err) {
        console.error("Помилка мережі:", err);
        setModal({
            isOpen: true,
            title: 'Збій мережі',
            message: 'Виникла помилка мережі. Спробуйте пізніше.',
            type: 'error',
            redirect: false
        });
    } finally {
        setIsProcessing(false);
    }
  };

  // Функція закриття модалки
  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    // Робимо редірект тільки якщо замовлення було успішним (redirect: true)
    if (modal.redirect) {
      navigate('/dashboard');
    }
  };

  return (
    <>
        <main className={styles.checkoutPage}>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Оформлення замовлення</h1>
            
            <div className={styles.layout}>
            <form onSubmit={handleSubmit} className={styles.formSection}>
                <h2 className={styles.sectionTitle}>1. Дані для доставки</h2>
                <div className={styles.formGroup}>
                <label>Ім'я та прізвище отримувача</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                <label>Контактний номер телефону</label>
                <input type="tel" name="phone" required placeholder="+380" value={formData.phone} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                <label>Адреса доставки</label>
                <input type="text" name="address" required placeholder="Місто, вулиця, будинок, квартира" value={formData.address} onChange={handleChange} />
                </div>

                <h2 className={styles.sectionTitle}>2. Спосіб оплати</h2>
                <div className={styles.formGroup}>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={styles.selectInput}>
                    <option value="cash">Готівкою при отриманні</option>
                    <option value="card">Карткою онлайн на сайті (Visa / MasterCard)</option>
                </select>
                </div>

                {formData.paymentMethod === 'card' && (
                <div className={styles.creditCardBox}>
                    <div className={styles.formGroup}>
                    <label>Номер картки</label>
                    <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" maxLength="19" value={formData.cardNumber} onChange={handleChange} required />
                    </div>
                    <div className={styles.cardRow}>
                    <div className={styles.formGroup}>
                        <label>Термін дії</label>
                        <input type="text" name="expiryDate" placeholder="MM/YY" maxLength="5" value={formData.expiryDate} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>CVV</label>
                        <input type="text" name="cvv" placeholder="123" maxLength="3" value={formData.cvv} onChange={handleChange} required />
                    </div>
                    </div>
                </div>
                )}

                <h2 className={styles.sectionTitle}>3. Додатково</h2>
                <div className={styles.formGroup}>
                <label>Коментар до замовлення</label>
                <textarea name="comment" rows="3" value={formData.comment} onChange={handleChange} />
                </div>
            </form>

            <aside className={styles.summarySection}>
                <h2 className={styles.summaryTitle}>Ваше замовлення</h2>
                <div className={styles.itemsList}>
                <div className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{cartItem.title}</span>
                    <span className={styles.itemPrice}>{cartItem.price} ₴</span>
                    </div>
                    <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                        <button type="button" onClick={() => handleQuantityChange(-1)}>-</button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                    <button type="button" onClick={handleRemoveItem} className={styles.removeBtn}>&times;</button>
                    </div>
                </div>
                </div>
                <div className={styles.priceSummary}>
                <div className={styles.totalRow}>
                    <span>Разом до сплати:</span>
                    <span className={styles.totalPrice}>{totalAmount} ₴</span>
                </div>
                </div>
                <div className={styles.actions}>
                <button type="submit" onClick={handleSubmit} className={styles.submitButton} disabled={isProcessing}>
                    {isProcessing ? 'Обробка транзакції...' : (formData.paymentMethod === 'card' ? `Оплатити ${totalAmount} ₴` : 'Підтвердити замовлення')}
                </button>
                </div>
            </aside>
            </div>
        </div>
        </main>

        {/* Викликаємо наш універсальний компонент модалки. Вона з'явиться, коли modal.isOpen === true */}
        <MessageModal 
            isOpen={modal.isOpen} 
            title={modal.title} 
            message={modal.message} 
            type={modal.type} 
            onClose={handleCloseModal} 
        />
    </>
  );
}

export default Checkout;