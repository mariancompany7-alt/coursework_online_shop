import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../Header/Header.module.css';
import defaultAvatar from '../../../public/images/avatar.png'; 

function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    }
  }, [location]);

  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navigation}>
        <ul>
          <li><Link to="/">Головна</Link></li>
          <li><a href="/#about">Про нас</a></li>
          <li><a href="/#menu">Меню</a></li>
          <li><a href="#contact">Контакти</a></li>
        </ul>
      </nav>
      
      <div className={styles.actions}>
        {user ? (
          <Link to="/dashboard" className={styles.profileLink} title="Особистий кабінет">
            <span className={styles.username}>Кабінет</span>
            <div className={styles.profileAvatar}>
              <img 
                src={defaultAvatar} 
                alt="Аватар користувача" 
                className={styles.avatarImg} 
              />
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <button type="button" className={styles.button}>Увійти</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;