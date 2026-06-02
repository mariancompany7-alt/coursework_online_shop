import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../products/ProductCard/Card';
import styles from './Main.module.css';

function Main({ plans }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  // 1. Додаємо стан для вікна попередження адміністратора
  const [showAdminModal, setShowAdminModal] = useState(false);

  if (!plans || !Array.isArray(plans)) return <p>Завантаження планів...</p>;

  return (
    <div className={styles['main-wrapper']}>
      <section className={styles.mealPlans}>
        <div className={styles['section-header']}>
          <h1>Наші плани здорового харчування</h1>
          <p>Оберіть ідеальний план підписки для вашого способу життя</p>
        </div>
        
        <div className={styles['cards-grid']}>
          {plans.map((plan) => (
            <Card 
              key={plan._id} 
              boxData={plan} 
              onRequireAuth={() => setShowAuthModal(true)} 
              // 2. Передаємо функцію для показу вікна адміну
              onAdminWarning={() => setShowAdminModal(true)} 
            />
          ))}
        </div>
      </section>

      {/* Модалка для неавторизованих (залишається як була) */}
      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Потрібна авторизація</h2>
            <p>Щоб оформити замовлення та відстежувати його статус, будь ласка, увійдіть у свій акаунт.</p>
            
            <div className={styles.modalActions}>
              <Link to="/login" className={styles.loginBtn}>Увійти в акаунт</Link>
              <button onClick={() => setShowAuthModal(false)} className={styles.closeBtn}>
                Продовжити перегляд
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. НОВА Модалка для адміністратора */}
      {showAdminModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAdminModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}></div>
            <h2>Доступ обмежено</h2>
            <p>Адміністратори не можуть створювати клієнтські замовлення. Увійдіть як звичайний покупець, щоб оформити покупку.</p>
            
            <div className={styles.modalActions}>
              <button onClick={() => setShowAdminModal(false)} className={styles.closeBtn} style={{ backgroundColor: '#444', color: '#fff' }}>
                Зрозуміло
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;