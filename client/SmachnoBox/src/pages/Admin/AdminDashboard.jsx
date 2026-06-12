import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import { useNavigate } from 'react-router-dom';

import AdminBoxes from './tabs/AdminBoxes';
import AdminOrders from './tabs/AdminOrders';
import AdminUsers from './tabs/AdminUsers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('boxes');
  const [adminInfo, setAdminInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAdminInfo(JSON.parse(savedUser));
    }
  }, []);

  const navigate = useNavigate();

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h2>Панель керування</h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.profileBadge}>
            <span>{adminInfo?.email || 'admin@smachnobox.com'}</span>
          </div>
          <button className={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>Вийти</button>
        </div>
      </header>

      <nav className={styles.topNav}>
        <button
          className={`${styles.navBtn} ${activeTab === 'boxes' ? styles.activeBtn : ''}`}
          onClick={() => setActiveTab('boxes')}
        >
          Бокси
        </button>
        <button
          className={`${styles.navBtn} ${activeTab === 'orders' ? styles.activeBtn : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Замовлення
        </button>
        <button
          className={`${styles.navBtn} ${activeTab === 'users' ? styles.activeBtn : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Користувачі
        </button>
      </nav>
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

      {showLogoutModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Вихід з адмін-панелі</h2>
            <p>Ви дійсно хочете завершити сеанс адміністратора?</p>

            <div className={styles.modalActionsRow}>
              <button onClick={confirmLogout} className={styles.logoutConfirmBtn}>
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
};

export default AdminDashboard;