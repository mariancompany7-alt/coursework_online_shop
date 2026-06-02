import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
      fetchMyOrders();
    }
  }, [navigate]);

  // Функція завантаження замовлень поточного користувача
  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMyOrders(data);
      }
    } catch (err) {
      console.error("Помилка завантаження замовлень:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Не забуваємо видалити токен!
    navigate('/login');
  };

  // Словник для перекладу та розфарбовування статусів
  const statusConfig = {
    pending: { label: 'Очікує підтвердження', color: '#f39c12' },
    processing: { label: 'Готується', color: '#3498db' },
    delivering: { label: 'В дорозі', color: '#9b59b6' },
    completed: { label: 'Доставлено', color: '#2ecc71' },
    cancelled: { label: 'Скасовано', color: '#e74c3c' }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.dashboardWrapper}>
        <h1 className={`${styles.pageTitle} ${user.role === 'admin' ? styles.adminTitle : ''}`}>
          Особистий кабінет
        </h1>

        <div className={`${styles.contentGrid} ${user.role === 'admin' ? styles.adminLayout : ''}`}>
          {/* Картка з інформацією профілю (залишилася без змін) */}
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className={styles.userName}>{user.full_name}</h2>
                <span className={styles.roleBadge}>
                  {user.role === 'admin' ? 'Адміністратор' : 'Клієнт'}
                </span>
              </div>
            </div>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{user.email || 'Не вказано'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Телефон:</span>
                <span className={styles.value}>{user.phone || 'Не вказано'}</span>
              </div>
            </div>

            <button onClick={handleLogout} className={styles.logoutBtn}>
              Вийти з акаунта
            </button>

            {user.role === 'admin' && (
              <button
                className={styles.adminBtn}
                style={{ width: '100%', marginTop: '10px', backgroundColor: '#34495e', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
                onClick={() => navigate('/admin')}
              >
                Увійти в Адмін Панель
              </button>
            )}
          </div>

          {/* Історія замовлень */}
          {user.role !== 'admin' && (
            <div className={styles.ordersCard}>
              <h3 className={styles.ordersTitle}>🛒 Мої замовлення</h3>

              {loadingOrders ? (
                <p>Завантаження...</p>
              ) : myOrders.length === 0 ? (
                <p className={styles.emptyOrders}>Ви ще не зробили жодного замовлення.</p>
              ) : (
                <div className={styles.ordersList}>
                  {myOrders.map(order => (
                    <div key={order._id} className={styles.orderItem}>

                      <div className={styles.orderHeader}>
                        <span className={styles.orderId}>
                          № {order._id.slice(-6).toUpperCase()} • {new Date(order.createdAt).toLocaleDateString('uk-UA')}
                        </span>

                        <span className={styles.orderStatusBadge}>
                          {{
                            pending: 'Очікує',
                            processing: 'В обробці',
                            delivering: 'В дорозі',
                            completed: 'Виконано',
                            cancelled: 'Скасовано'
                          }[order.status] || order.status}
                        </span>
                      </div>

                      <div className={styles.orderDetails}>
                        <div className={styles.orderRow}>
                          <strong>Сума:</strong> <span>{order.total_amount} ₴</span>
                        </div>
                        <div className={styles.orderRow}>
                          <strong>Адреса:</strong> <span>м. {order.delivery_address.city}, вул. {order.delivery_address.street}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;