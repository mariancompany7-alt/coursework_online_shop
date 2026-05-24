import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';

// Імпортуємо підкомпоненти для кожної категорії
import AdminBoxes from './tabs/AdminBoxes';
import AdminOrders from './tabs/AdminOrders';
import AdminUsers from './tabs/AdminUsers';

const AdminDashboard = () => {
  // Стейт для відстеження активної категорії ('boxes', 'orders', 'users')
  const [activeTab, setActiveTab] = useState('boxes');
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAdminInfo(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Бокова панель з вибором категорій */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <h2>SmachnoBox</h2>
          <span className={styles.badge}>Панель керування</span>
        </div>

        <nav className={styles.navigation}>
          <button 
            className={`${styles.navBtn} ${activeTab === 'boxes' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTab('boxes')}
          >
            📦 Товари та бокси
          </button>
          
          <button 
            className={`${styles.navBtn} ${activeTab === 'orders' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📋 Замовлення
          </button>
          
          <button 
            className={`${styles.navBtn} ${activeTab === 'users' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Користувачі
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminName}>{adminInfo?.full_name || 'Адміністратор'}</div>
          <button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
        </div>
      </aside>

      {/* Основна робоча область сайту */}
      <main className={styles.mainContent}>
        {/* Шапка сторінки, яка змінює заголовок залежно від категорії */}
        <header className={styles.header}>
          <h1>
            {activeTab === 'boxes' && 'Керування каталогом товарів'}
            {activeTab === 'orders' && 'Управління поточними замовленнями'}
            {activeTab === 'users' && 'Список зареєстрованих користувачів'}
          </h1>
          <div className={styles.profileBadge}>
            <span>{adminInfo?.email || 'admin@smachnobox.com'}</span>
          </div>
        </header>

        {/* Динамічний вивід потрібного компонента */}
        <div className={styles.contentBody}>
          {activeTab === 'boxes' && <AdminBoxes />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'users' && <AdminUsers />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;