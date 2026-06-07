import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Стан для керування повідомленням
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Помилка:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        // Оновлюємо локальний стан масиву замовлень
        setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        
        // 2. Викликаємо Toast замість alert
        showToast('Статус замовлення успішно оновлено!');
      }
    } catch (error) {
      console.error("Помилка зміни статусу:", error);
    }
  };

  // 3. Функція для активації таймера
  const showToast = (message) => {
    setToastMessage(message);
    // Скидаємо стан через 3 секунди, щоб анімація могла спрацювати знову при наступному кліку
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  if (loading) return <p>Завантаження замовлень...</p>;

  return (
    <div>
      <h2 className={styles.tabTitle}>Управління замовленнями</h2>
      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Клієнт</th>
              <th>Сума</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o._id.slice(-6).toUpperCase()}</td>
                <td>{o.delivery_address?.city}, {o.delivery_address?.street}</td>
                <td>{o.total_amount} ₴</td>
                <td>
                  <select 
                    className={styles.statusSelect}
                    value={o.status} 
                    onChange={e => changeStatus(o._id, e.target.value)}
                  >
                    <option value="pending">Очікує</option>
                    <option value="processing">В обробці</option>
                    <option value="delivering">В дорозі</option>
                    <option value="completed">Виконано</option>
                    <option value="cancelled">Скасовано</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Рендеринг компонента Toast */}
      {toastMessage && (
        <div className={styles.toastNotification}>
          <span style={{ fontSize: '18px' }}>✓</span>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;