import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/orders', { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    if (res.ok) setOrders(await res.json());
  };

  useEffect(() => { loadOrders(); }, []);

  const changeStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) loadOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Видалити замовлення?")) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/orders/${id}`, { 
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` } 
    });
    if (res.ok) loadOrders();
  };

  return (
    <div className={styles.tabContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата та час</th>
            <th>Клієнт (Контакти)</th>
            <th>Замовлені товари</th>
            <th>Адреса доставки</th>
            <th>Сума</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td className={styles.dateTimeCell}>
                {new Date(o.createdAt).toLocaleString('uk-UA', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              
              <td className={styles.clientCell}>
                <div className={styles.contactInfo}>{o.user_id?.phone || 'Телефон не вказано'}</div>
                <div className={styles.contactSubInfo}>{o.user_id?.email || 'Email не вказано'}</div>
              </td>
              
              <td className={styles.itemsCell}>
                {o.items && o.items.map((item, idx) => (
                  <div key={idx} className={styles.orderItemContainer}>
                    <span className={styles.itemTitle}>
                      {item.box_id?.title || item.box_id?.name || 'План харчування'}
                    </span>
                    <span className={styles.itemDetails}>
                      Кількість: {item.quantity} шт. ({item.price} ₴/шт)
                    </span>
                  </div>
                ))}
              </td>

              <td>{o.delivery_address ? `${o.delivery_address.city} ${o.delivery_address.street}` : '—'}</td>
              <td className={styles.amountCell}><b>{o.total_amount} ₴</b></td>
              <td>
                <select 
                  className={`${styles.select} ${styles[`status_${o.status}`]}`}
                  value={o.status} 
                  onChange={e => changeStatus(o._id, e.target.value)}
                >
                  <option value="pending">Очікує на підтвердження</option>
                  <option value="processing">В обробці</option>
                  <option value="delivering">В дорозі</option>
                  <option value="completed">Доставлено</option>
                  <option value="cancelled">Скасовано</option>
                </select>
              </td>
              <td>
                <div className={styles.actionsGroup}>
                  <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => deleteOrder(o._id)}>
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}