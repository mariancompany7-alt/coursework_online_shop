import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/orders', { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const changeStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    if (res.ok) loadOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Видалити це замовлення?")) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/orders/${id}`, { 
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` } 
    });
    if (res.ok) loadOrders();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerPanel}>
        <h2 className={styles.title}>Поточні замовлення</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата / Час</th>
            <th>Номер</th>
            <th>Користувач</th>
            <th>Адреса доставки</th>
            <th>Сума</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>
                <div>{new Date(o.createdAt).toLocaleDateString('uk-UA')}</div>
                <div style={{ fontSize: '12px', color: '#636e72' }}>
                  {new Date(o.createdAt).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </td>
              <td className={styles.colBold}>#{o._id.slice(-6).toUpperCase()}</td>
              <td>
                <div>{o.user_id?.full_name || 'Гість'}</div>
                <div style={{ fontSize: '12px', color: '#636e72' }}>{o.user_id?.phone || '—'}</div>
              </td>
              <td>
                {o.delivery_address 
                  ? `м. ${o.delivery_address.city}, вул. ${o.delivery_address.street}` 
                  : 'Не вказано'}
              </td>
              <td className={styles.colPrice}>{o.total_amount} ₴</td>
              <td>
                <select 
                  className={`${styles.statusSelect} ${styles[`status_${o.status}`]}`}
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
    </div>
  );
}