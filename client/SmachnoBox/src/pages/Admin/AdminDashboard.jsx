import React, { useState } from 'react';
import AdminOrders from './tabs/AdminOrders';
import AdminBoxes from './tabs/AdminBoxes';
import AdminUsers from './tabs/AdminUsers';
import styles from './tabs/AdminTabs.module.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '30px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Горизонтальні вкладки зверху сторінки */}
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'orders' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Замовлення
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'boxes' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('boxes')}
          >
            🍔 Каталог Боксів
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'users' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Клієнти / Користувачі
          </button>
        </div>

        {/* Контент обраної вкладки */}
        <div>
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'boxes' && <AdminBoxes />}
          {activeTab === 'users' && <AdminUsers />}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;