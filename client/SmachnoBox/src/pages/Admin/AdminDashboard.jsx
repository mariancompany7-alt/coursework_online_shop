import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';

import AdminBoxes from './tabs/AdminBoxes';
import AdminOrders from './tabs/AdminOrders';
import AdminUsers from './tabs/AdminUsers';

const AdminDashboard = () => {
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
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <h2 className={styles.badge}>Панель керування</h2>
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
          <button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
        </div>
      </aside>

      <main className={styles.mainContent}>
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