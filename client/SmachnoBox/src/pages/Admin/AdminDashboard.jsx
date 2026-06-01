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
      {/* Верхня шапка */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h2>Панель керування</h2>
          <span className={styles.badge}>SmachnoBox Admin</span>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.profileBadge}>
            <span>{adminInfo?.email || 'admin@smachnobox.com'}</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
        </div>
      </header>

      {/* Горизонтальне навігаційне меню */}
      <nav className={styles.topNav}>
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

      {/* Робоча область на всю ширину */}
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1>
            {activeTab === 'boxes' && 'Керування каталогом товарів'}
            {activeTab === 'orders' && 'Управління поточними замовленнями'}
            {activeTab === 'users' && 'Список зареєстрованих користувачів'}
          </h1>
        </div>

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