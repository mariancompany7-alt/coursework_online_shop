import React from 'react'
import styles from './Footer.module.css'

function Footer() {
    return (
        <div>
            <footer>
                <div className={styles.contacts}>
                    <address>
                        <h3>Адреса:</h3>
                        <p>м.Тернопіль, вул. Тарнавського 44</p>
                    </address>
                    <h3>Телефон:</h3>
                    <p>+380 00 111 00 11</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer