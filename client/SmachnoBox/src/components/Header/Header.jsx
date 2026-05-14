import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../common/Button/Button';

function Header({ children }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                
                {/* Логотип (клікабельний) */}
                <Link to="/" className={styles.logo} style={{ textDecoration: 'none' }}>
                    <img src="/images/logo.png" alt="SmachnoBox Logo" />
                    <h1>SmachnoBox</h1>
                </Link>

                {/* Блок навігації, куди потрапить Navbar */}
                <nav className={styles.navigation}>
                    {children}
                </nav>

                {/* Кнопка входу */}
                <div className={styles.actions}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button>Увійти</Button>
                    </Link>
                </div>
                
            </div>
        </header>
    );
}

export default Header;