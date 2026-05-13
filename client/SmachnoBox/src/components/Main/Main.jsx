import React from 'react'
import Card from '../products/ProductCard/Card'
import styles from './Main.module.css'

function Main() {
  return (
    <div className={styles['main-wrapper']}>
      <section className={styles.mealPlans}>
        <div className={styles['section-header']}>
          <h1>Our Healthy Meal Plans</h1>
          <p>Choose the perfect subscription plan for your lifestyle</p>
        </div>
        <div className={styles['cards-grid']}>
          {plans.map((plan) => (
            <Card key={plan.id} boxData={plan} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Main