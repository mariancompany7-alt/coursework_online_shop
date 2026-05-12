import React from 'react'
import styles from './Header.module.css'
import Button from '../Button/Button'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img src="/images/logo.png" alt="SmachnoBox Logo" />
                    <h1>SmachnoBox</h1>
                </div>
                <nav className={styles.navigation}>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#plans">Plans</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <div className={styles.actions}>
                    <Button />
                </div>
            </div>
        </header>
    )
}

export default Header