import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ boxData, onRequireAuth, onAdminWarning }) {
    const { 
        _id, 
        title, 
        description, 
        price, 
        image_url, 
        tags = [],
        ingredients = []
    } = boxData;

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleOrderClick = (e) => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (!token || !storedUser) {
            e.preventDefault(); 
            if (onRequireAuth) onRequireAuth();
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.role === 'admin') {
            e.preventDefault(); 
            if (onAdminWarning) onAdminWarning();
        }
    };

    const calculateTotalCalories = () => {
        if (!ingredients || ingredients.length === 0) return 0;
        
        return ingredients.reduce((total, ing) => {
            if (typeof ing === 'object' && ing !== null && ing.nutritional_value) {
                return total + (ing.nutritional_value.calories || 0);
            }
            return total;
        }, 0);
    };

    const getRealisticCalories = (boxTitle) => {
        const t = boxTitle.toLowerCase();
        if (t.includes('схуднення') || t.includes('фітнес') || t.includes('light')) return '1200 - 1400';
        if (t.includes('спорт') || t.includes('strong') || t.includes('маса')) return '2400 - 2800';
        if (t.includes('веган') || t.includes('vegan') || t.includes('пісний')) return '1500 - 1700';
        return '1800 - 2000'; 
    };

    const dbCalories = calculateTotalCalories();
    const displayCalories = dbCalories > 0 ? dbCalories : getRealisticCalories(title);

    return (
        <>
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
                        <div className={styles['detail-item']}>
                            <span className={styles['detail-label']}>Страв на тиждень:</span>
                            <span className={styles['detail-value']}>21</span>
                        </div>
                        <div className={styles['detail-item']}>
                            <span className={styles['detail-label']}>Ціна:</span>
                            <span className={styles['detail-value']}>{price} ₴</span>
                        </div>
                        <div className={styles['detail-item']}>
                            <span className={styles['detail-label']}>Доставка:</span>
                            <span className={styles['detail-value']}>Щодня</span>
                        </div>
                    </div>

                    <div className={styles.actionsRow}>
                        <button 
                            type="button"
                            className={styles.infoBtn} 
                            onClick={() => setShowDetailsModal(true)}
                        >
                            Склад та Ккал
                        </button>

                        <Link 
                            to="/checkout" 
                            state={{ selectedBox: boxData }} 
                            className={styles.orderLink}
                            onClick={handleOrderClick}
                        >
                            <button className={styles['card-button']}>
                                Замовити
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {showDetailsModal && (
                <div className={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{title}</h2>
                        </div>
                        
                        <h4 className={styles.modalSectionTitle}>Енергетична цінність:</h4>
                        <p className={styles.modalValue}>
                            <span>{displayCalories} ккал</span>
                        </p>

                        <h4 className={styles.modalSectionTitle}>Повний склад раціону:</h4>
                        <div className={styles.modalText}>
                            {ingredients && ingredients.length > 0 ? (
                                <ul className={styles.ingredientsList}>
                                    {ingredients.map((ing, idx) => {
                                        const isObj = typeof ing === 'object' && ing !== null;
                                        const name = isObj ? ing.name : ing;
                                        const weight = isObj && ing.weight_grams ? `${ing.weight_grams}г` : null;
                                        const ingCalories = isObj && ing.nutritional_value?.calories 
                                            ? `${ing.nutritional_value.calories} ккал` 
                                            : null;

                                        return (
                                            <li key={idx} className={styles.ingredientBadge}>
                                                {name} 
                                                {weight && <span className={styles.ingredientWeight}>({weight})</span>}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <ul className={styles.ingredientsList}>
                                    <li className={styles.ingredientBadge}>
                                        Сніданок: Сирники з кокосовою згущенкою <span className={styles.ingredientWeight}>(200г)</span>
                                    </li>
                                    <li className={styles.ingredientBadge}>
                                        Перекус 1: Фруктовий салат з горіхами <span className={styles.ingredientWeight}>(150г)</span>
                                    </li>
                                    <li className={styles.ingredientBadge}>
                                        Обід: Куряче філе су-від з кінза-соусом та кіноа <span className={styles.ingredientWeight}>(350г)</span>
                                    </li>
                                    <li className={styles.ingredientBadge}>
                                        Перекус 2: Крем-суп із сочевиці <span className={styles.ingredientWeight}>(250г)</span>
                                    </li>
                                    <li className={styles.ingredientBadge}>
                                        Вечеря: Запечений лосось із броколі на пару <span className={styles.ingredientWeight}>(300г)</span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <button className={styles.closeBtn} onClick={() => setShowDetailsModal(false)}>
                            Закрити
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Card;