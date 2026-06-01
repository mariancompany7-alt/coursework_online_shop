import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ boxData }) {
    const { _id, title, description, price, image_url, tags = [], ingredients = [] } = boxData;
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    // Підраховуємо загальну калорійність боксу
    // (Припускаємо, що в моделі Ingredient є поле 'calories')
    const totalCalories = ingredients.reduce((sum, item) => sum + (item.calories || 0), 0);

    const handleOrderClick = () => {
        // Переходимо на Checkout і передаємо дані цього конкретного боксу
        navigate('/checkout', { state: { selectedBox: boxData } });
    };

    return (
        <div className={styles.card}>
            <img src={image_url} alt={title} className={styles['card-image']} />

            <div className={styles['card-content']}>
                <h2 className={styles['card-title']}>{title}</h2>
                <p className={styles['card-description']}>{description}</p>

                <div className={styles['card-highlights']}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles['highlight-badge']}>{tag}</span>
                    ))}
                </div>

                {/* Блок з деталями та калоріями */}
                <div style={{ margin: '15px 0' }}>
                    <button 
                        onClick={() => setShowDetails(!showDetails)} 
                        style={{ background: 'none', border: 'none', color: '#56ab2f', cursor: 'pointer', fontWeight: 'bold', padding: '0' }}
                    >
                        {showDetails ? '▲ Сховати склад' : '▼ Показати склад та калорії'}
                    </button>
                    
                    {showDetails && (
                        <div style={{ marginTop: '10px', fontSize: '14px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px', color: '#333' }}>
                            <p style={{ margin: '0 0 10px 0' }}><strong>Загальна енергетична цінність:</strong> {totalCalories} ккал</p>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                {ingredients.length > 0 ? ingredients.map((ing) => (
                                    <li key={ing._id}>
                                        {ing.title || ing.name} — {ing.calories} ккал
                                    </li>
                                )) : <li>Склад ще формується</li>}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles['card-details']}>
                    <div className={styles['detail-item']}>
                        <span className={styles['detail-label']}>Страв у наборі:</span>
                        <span className={styles['detail-value']}>{ingredients.length || 21}</span>
                    </div>

                    <div className={styles['detail-item']}>
                        <span className={styles['detail-label']}>Ціна:</span>
                        <span className={styles['detail-value']}>{price} ₴</span>
                    </div>
                </div>

                <button className={styles['card-button']} onClick={handleOrderClick} style={{ width: '100%', marginTop: '15px' }}>
                    Замовити зараз
                </button>
            </div>
        </div>
    );
}

export default Card;