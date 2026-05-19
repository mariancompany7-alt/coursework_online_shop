import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. При завантаженні сторінки дістаємо дані користувача з пам'яті
    const storedUser = localStorage.getItem('user');
    
    // 2. Якщо людина не увійшла (немає даних) -> відправляємо на сторінку логіну
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Функція виходу з акаунта
  const handleLogout = () => {
    localStorage.removeItem('user'); // Видаляємо користувача з пам'яті
    navigate('/login'); // Повертаємо на сторінку входу
  };

  // Поки дані вантажаться, нічого не показуємо
  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.dashboardWrapper}>
        <h1 className={styles.pageTitle}>Особистий кабінет</h1>
        
        <div className={styles.contentGrid}>
          {/* Картка з інформацією профілю */}
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              {/* Генеруємо кружечок з першою літерою імені */}
              <div className={styles.avatar}>
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className={styles.userName}>{user.full_name}</h2>
                <span className={styles.roleBadge}>
                  {user.role === 'admin' ? '👑 Адміністратор' : '👤 Клієнт'}
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
          </div>

          {/* Тут у майбутньому буде історія замовлень або адмін-панель */}
          <div className={styles.placeholderCard}>
            <h3>🛒 Мої замовлення</h3>
            <p>Ви ще не зробили жодного замовлення.</p>
            {user.role === 'admin' && (
              <button className={styles.adminBtn} onClick={() => alert('Тут буде перехід в Адмін Панель')}>
                Увійти в Адмін Панель
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;