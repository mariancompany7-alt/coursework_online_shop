import React from 'react'
import Card from '../products/ProductCard/Card'
import styles from './Main.module.css'

function Main({ plans }) {
  // Перевірка наявності масиву перед рендерингом
  if (!plans || !Array.isArray(plans)) return <p>Loading plans or error occurred...</p>;
  
  return (
    <div className={styles['main-wrapper']}>
      <section className={styles.mealPlans}>
        <div className={styles['section-header']}>
          <h1>Наші плани здорового харчування</h1>
          <p>Оберіть ідеальний план підписки для вашого способу життя</p>
        </div>
        <div className={styles['cards-grid']}>
          {plans.map((plan) => (
            <Card key={plan._id} boxData={plan} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Main