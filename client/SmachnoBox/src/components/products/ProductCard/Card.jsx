import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import MessageModal from '../../Modal/MessageModal'; // Імпорт модалки

function Card({ boxData }) {
    const { _id, title, description, price, image_url, tags = [] } = boxData;
    const navigate = useNavigate();
    
    // Стан для керування модальним вікном
    const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: '', action: null });

    const handleOrderClick = (e) => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === 'admin') {
                e.preventDefault(); // Блокуємо перехід
                setModal({
                    isOpen: true,
                    title: 'Увага!',
                    message: 'Адміністратори не можуть формувати клієнтські замовлення.',
                    type: 'warning',
                    action: null
                });
            }
        } else {
            e.preventDefault();
            setModal({
                isOpen: true,
                title: 'Потрібна авторизація',
                message: 'Будь ласка, увійдіть в акаунт, щоб зробити замовлення.',
                type: 'warning',
                action: () => navigate('/login') // Перехід після закриття модалки
            });
        }
    };

    const closeModal = () => {
        setModal({ ...modal, isOpen: false });
        if (modal.action) modal.action(); // Виконуємо дію (наприклад, редірект), якщо вона є
    };

    return (
        <>
            <div className={styles.card}>
                <img src={image_url} alt={title} className={styles['card-image']} />

                <div className={styles['card-content']}>
                    <h2 className={styles['card-title']}>{title}</h2>
                    <p className={styles['card-description']}>{description}</p>

                    <div className={styles['card-details']}>
                        <div className={styles['detail-item']}>
                            <span className={styles['detail-label']}>Ціна:</span>
                            <span className={styles['detail-value']}>{price} ₴</span>
                        </div>
                    </div>

                    <Link to="/checkout" className={styles.secondaryButton} onClick={handleOrderClick}>
                        <button className={styles['card-button']}>Замовити зараз</button>
                    </Link>
                </div>
            </div>
            
            <MessageModal 
                isOpen={modal.isOpen} 
                title={modal.title} 
                message={modal.message} 
                type={modal.type} 
                onClose={closeModal} 
            />
        </>
    );
}

export default Card;