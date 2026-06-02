import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Колонка з брендом та соцмережами */}
        <div className={styles.brandColumn}>
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="SmachnoBox Logo" />
            <h1>SmachnoBox</h1>
          </div>
          <p>Здорове та смачне харчування з доставкою до ваших дверей.</p>
          
          {/* Посилання на соцмережі */}
          <div className={styles.socialLinks}>
            <a href="https://t.me/smachnobox" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Telegram</a>
            <a href="https://instagram.com/smachnobox" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Instagram</a>
            <a href="https://twitter.com/smachnobox" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Twitter</a>
          </div>
        </div>

        {/* Колонка Про нас */}
        <div className={styles.column}>
          <h3>Про нас</h3>
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><a href="/#about">Про нас</a></li>
            <li><a href="/#menu">Меню</a></li>
          </ul>
        </div>

        {/* Колонка Контакти */}
        <div className={styles.column}>
          <h3>Контакти</h3>
          <ul>
            <li><a href="tel:+380961234567">+380 96 123 45 67</a></li>
            <li><a href="mailto:info@smachnobox.com">info@smachnobox.com</a></li>
            <li><span>Україна, м. Тернопіль</span></li>
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© 2026 SmachnoBox. Всі права захищені.</p>
      </div>
    </footer>
  );
}

export default Footer;