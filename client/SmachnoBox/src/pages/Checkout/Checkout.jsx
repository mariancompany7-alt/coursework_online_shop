import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Checkout.module.css';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItem, setCartItem] = useState(location.state?.selectedBox || null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Стан для модалки успіху
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', paymentMethod: 'cash', comment: '',
    cardNumber: '', expiryDate: '', cvv: ''
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        setFormData(prev => ({
          ...prev,
          name: u.full_name || prev.name,
          phone: u.phone || prev.phone,
          address: (u.addresses && u.addresses[0]) ? [u.addresses[0].city, u.addresses[0].street, u.addresses[0].building, u.addresses[0].apartment].filter(Boolean).join(', ') : prev.address
        }));
      }
    } catch (err) {
      // ignore
    }
  }, []);

  if (!cartItem) {
    return (
      <main className={styles.checkoutPage} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', backgroundColor: '#303030', padding: '40px', borderRadius: '16px', border: '1px solid #4a4a4a' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Ваш кошик порожній 🛒</h2>
          <p style={{ color: '#aaa', marginBottom: '25px' }}>Оберіть plan харчування у нашому каталозі.</p>
          <button className={styles.submitButton} onClick={() => navigate('/')}>Перейти до каталогу</button>
        </div>
      </main>
    );
  }

  const totalAmount = cartItem.price * quantity;

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

  const handleRemoveItem = () => {
    setCancelMessage('Ви впевнені, що хочете видалити цей товар з кошика?');
    setShowCancelModal(true);
  };

  const confirmRemoveItem = () => {
    setShowCancelModal(false);
    setCancelMessage('');
    setCartItem(null);
  };

  const parseDeliveryAddress = (address) => {
    const normalized = address.trim();
    if (!normalized) return { city: 'м. Тернопіль', street: '' };

    const parts = normalized.split(',').map(part => part.trim()).filter(Boolean);
    const firstPart = parts[0] ? parts[0].toLowerCase() : '';
    const hasTernopil = ['тернопіль', 'м тернопіль', 'м. тернопіль', 'м.тернопіль', 'м. тернополь'].some(indicator => firstPart.includes(indicator));

    if (hasTernopil && parts.length > 1) {
      return {
        city: 'м. Тернопіль',
        street: parts.slice(1).join(', ')
      };
    }

    return {
      city: 'м. Тернопіль',
      street: normalized
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage("Щоб завершити оформлення замовлення, будь ласка, спочатку увійдіть у свій акаунт або зареєструйтесь.");
      return;
    }

    if (!formData.name || !formData.name.trim()) {
      setErrorMessage("Будь ласка, введіть ім'я та прізвище отримувача.");
      return;
    }

    if (!formData.phone || !formData.phone.trim()) {
      setErrorMessage("Будь ласка, введіть контактний номер телефону.");
      return;
    }

    if (!formData.address || !formData.address.trim()) {
      setErrorMessage("Будь ласка, введіть адресу доставки.");
      return;
    }

    if (formData.paymentMethod === 'card') {
      if (formData.cardNumber.length < 19 || formData.expiryDate.length < 5 || formData.cvv.length < 3) {
        setErrorMessage("Будь ласка, введіть коректні дані платіжної картки.");
        return;
      }
    }

    setIsProcessing(true);

    const processPayment = new Promise(resolve => {
      setTimeout(() => resolve(true), 1500);
    });
    await processPayment;

    const addressData = parseDeliveryAddress(formData.address);

    if (!cartItem || !cartItem._id) {
      setErrorMessage('Неможливо оформити замовлення, оберіть план харчування ще раз.');
      setIsProcessing(false);
      return;
    }

    const orderPayload = {
      total_amount: totalAmount,
      delivery_address: addressData,
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
        setSuccessMessage('Ваше замовлення успішно сформовано! Дякуємо, що обрали SmachnoBox.');
      } else if (res.status === 401) {
        setErrorMessage("Сесія застаріла. Будь ласка, увійдіть в акаунт знову.");
      } else {
        const errorData = await res.json();
        setErrorMessage(`Помилка: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Помилка мережі:", err);
      setErrorMessage("Виникла помилка мережі. Спробуйте пізніше.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessMessage('');
    navigate('/dashboard');
  };

  return (
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
              <button type="button" className={styles.submitButton} disabled={isProcessing} onClick={handleSubmit}>
                {isProcessing ? 'Обробка транзакції...' : (formData.paymentMethod === 'card' ? `Оплатити ${totalAmount} ₴` : 'Підтвердити замовлення')}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {successMessage && (
        <div className={styles.modalOverlay} onClick={handleSuccessClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon} style={{ fontSize: '40px', marginBottom: '10px' }}></div>
            <h2 style={{ color: '#56ab2f' }}>Сформовано</h2>
            <p>{successMessage}</p>
            <div className={styles.modalActions}>
              <button onClick={handleSuccessClose} className={styles.closeBtn} style={{ backgroundColor: '#56ab2f' }}>
                Зрозуміло
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className={styles.modalOverlay} onClick={() => setErrorMessage('')}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Увага</h2>
            <p>{errorMessage}</p>
            <div className={styles.modalActions}>
              {!localStorage.getItem('token') ? (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
                  <button onClick={() => navigate('/login')} className={styles.closeBtn} style={{ backgroundColor: '#56ab2f' }}>
                    Увійти
                  </button>
                  <button onClick={() => setErrorMessage('')} className={styles.closeBtn} style={{ backgroundColor: '#7f8c8d' }}>
                    Назад
                  </button>
                </div>
              ) : (
                <button onClick={() => setErrorMessage('')} className={styles.closeBtn}>
                  Зрозуміло
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCancelModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <p>{cancelMessage}</p>
            <div className={styles.modalActions}>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
                <button onClick={confirmRemoveItem} className={styles.closeBtn} style={{ backgroundColor: '#e74c3c' }}>
                  Видалити
                </button>
                <button onClick={() => setShowCancelModal(false)} className={styles.closeBtn} style={{ backgroundColor: '#7f8c8d' }}>
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Checkout;