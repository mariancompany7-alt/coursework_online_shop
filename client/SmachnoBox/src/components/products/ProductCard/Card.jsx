import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

function Card({ boxData }) {
    const {
        _id,
        title,
        description,
        price,
        image_url,
        tags = []
    } = boxData;

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

                <div className={styles['card-details']}>
                    {/* Статичні значення для полів, яких ще немає в БД */}
                    <div className={styles['detail-item']}>
                        <span className={styles['detail-label']}>Страв на тиждень:</span>
                        <span className={styles['detail-value']}>21</span>
                    </div>

                    <div className={styles['detail-item']}>
                        <span className={styles['detail-label']}>Ціна:</span>
                        {/* Форматування ціни */}
                        <span className={styles['detail-value']}>{price} ₴</span>
                    </div>

                    <div className={styles['detail-item']}>
                        <span className={styles['detail-label']}>Доставка:</span>
                        <span className={styles['detail-value']}>Щодня</span>
                    </div>
                </div>

                <Link to="/checkout" className={styles.secondaryButton}>
                    <button
                        className={styles['card-button']}
                        onClick={() => console.log(`Замовлення боксу: ${_id}`)}>
                        Замовити зараз
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default Card;