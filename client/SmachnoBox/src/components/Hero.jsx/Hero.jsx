import React from 'react'
import styles from './Hero.module.css'

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1>Смачно. Корисно. Швидко.</h1>
                    <p>Твій персональний раціон здорового харчування з доставкою до дверей.</p>
                    <a href="#menu" className={styles.ctaButton}>Обрати раціон</a>
                </div>
            </div>
        </section>
    )
}

export default Hero