import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // НАДІЙНА ФУНКЦІЯ ДЛЯ СТАТУСІВ (Вирішує проблему пустого місця)
  const getStatusLabel = (status) => {
    // Якщо статусу немає (старі замовлення з БД), ставимо 'Очікує' за замовчуванням
    const currentStatus = status ? status.toLowerCase() : 'pending';
    
    const statuses = {
      pending: 'Очікує',
      processing: 'В обробці',
      delivering: 'В дорозі',
      completed: 'Виконано',
      cancelled: 'Скасовано'
    };
    
    return statuses[currentStatus] || currentStatus; 
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.dashboardWrapper}>
        <h1 className={`${styles.pageTitle} ${user.role === 'admin' ? styles.adminTitle : ''}`}>
          Особистий кабінет
        </h1>

        <div className={`${styles.contentGrid} ${user.role === 'admin' ? styles.adminLayout : ''}`}>
          
          {/* Картка з інформацією профілю */}
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className={styles.userName}>{user.full_name}</h2>
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

            <button className={styles.logoutButton} onClick={() => setShowLogoutModal(true)}>
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

          {/* Історія замовлень (тільки для покупців) */}
          {user.role !== 'admin' && (
            <div className={styles.ordersCard}>
              <h3 className={styles.ordersTitle}>Мої замовлення</h3>

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
                          № {order._id.slice(-6).toUpperCase()} - {new Date(order.createdAt).toLocaleDateString('uk-UA')}
                        </span>

                        {/* Використовуємо нашу нову функцію */}
                        <span className={styles.orderStatusBadge}>
                          {getStatusLabel(order.status)}
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
      
      {/* МОДАЛЬНЕ ВІКНО ПІДТВЕРДЖЕННЯ ВИХОДУ */}
      {showLogoutModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Вихід з акаунта</h2>
            <p>Ви дійсно хочете вийти зі свого профілю?</p>

            <div className={styles.modalActionsRow}>
              <button onClick={confirmLogout} className={styles.logoutButton}>
                Так, вийти
              </button>
              <button onClick={() => setShowLogoutModal(false)} className={styles.closeBtn}>
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;