import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ boxData }) {
    const { _id, title, description, price, image_url, tags = [], ingredients = [] } = boxData;
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    const totalCalories = ingredients.reduce((sum, item) => sum + (item.nutritional_value?.calories || 0), 0);

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
                <div className={styles['ingredients-section']} style={{ margin: '15px 0' }}>
                    <button
                        className={styles['details-toggle']}
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? '▲ Сховати склад' : '▼ Показати склад та калорії'}
                    </button>

                    {showDetails && (
                        <div className={styles['details-container']}>
                            <p className={styles['details-calories']}>
                                <span>Енергетична цінність:</span>
                                <span className={styles['details-calories-value']}>{totalCalories} ккал</span>
                            </p>
                            <ul className={styles['details-list']}>
                                {ingredients.length > 0 ? ingredients.map((ing) => (
                                    <li key={ing._id}>
                                        {ing.name} <span className={styles['item-calories']}>— {ing.nutritional_value?.calories || 0} ккал</span>
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