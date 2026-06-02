import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `Помилка HTTP: ${res.status}`);
      }

      const data = await res.json();
      // Перевірка, чи бекенд дійсно повернув масив
      if (Array.isArray(data)) {
        setOrders(data);
        setError(null);
      } else {
        throw new Error("Бекенд повернув не масив даних!");
      }
    } catch (err) {
      console.error("Помилка завантаження замовлень:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const changeStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');

      // УВАГА: Якщо в orderRoutes.js у тебе написано router.put('/:id', ...), 
      // то забери /status з кінця цього URL!
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error("Не вдалося оновити статус");
      loadOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Видалити замовлення?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) loadOrders();
    } catch (err) {
      alert("Помилка видалення");
    }
  };

  return (
    <div className={styles.tabContainer}>
      {error && <div style={{ color: '#ff4757', padding: '10px', backgroundColor: 'rgba(255,71,87,0.1)', borderRadius: '8px', marginBottom: '20px' }}>
        Помилка: {error}
      </div>}

      {orders.length === 0 && !error ? (
        <p>Замовлень поки немає або вони завантажуються...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Клієнт</th>
              <th>Адреса доставки</th>
              <th>Сума</th>
              <th>Статус</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{new Date(o.createdAt).toLocaleDateString('uk-UA')}</td>
                <td>{o.user_id?.full_name || 'Гість'}<br /><small>{o.user_id?.phone}</small></td>
                <td>{o.delivery_address ? `м. ${o.delivery_address.city}, вул. ${o.delivery_address.street}` : '—'}</td>
                <td><b>{o.total_amount} ₴</b></td>
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
                <td>
                  <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => deleteOrder(o._id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}