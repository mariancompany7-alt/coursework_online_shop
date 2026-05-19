import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ children }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                
                {/* Клікабельний Логотип */}
                <Link to="/" className={styles.logo} style={{ textDecoration: 'none' }}>
                    <img src="/images/logo.png" alt="SmachnoBox Logo" />
                    <h1>SmachnoBox</h1>
                </Link>

                {/* Рендеринг компонента Navbar */}
                {children}

            </div>
        </header>
    );
}

export default Header;