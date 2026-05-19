import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../Header/Header.module.css';

function Navbar() {
  const location = useLocation(); // Відстежує переходи між сторінками
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Щоразу при зміні URL перевіряємо, чи увійшов користувач
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]); // Цей масив залежностей змушує навбар оновлюватися миттєво

  // Функція для плавного скролу по головній сторінці
  const handleScroll = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `/#${id}`);
      }
    }
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        <li><Link to="/">Головна</Link></li>
        <li><Link to="/#about" onClick={(e) => handleScroll(e, 'about')}>Про нас</Link></li>
        <li><Link to="/#menu" onClick={(e) => handleScroll(e, 'menu')}>Меню</Link></li>
        <li><Link to="/#contact" onClick={(e) => handleScroll(e, 'contact')}>Контакти</Link></li>
      </ul>
      
      <Link to={user ? "/dashboard" : "/login"}>
        <div className={styles.actions}>
          <button type='button' className={styles.button}>Увійти</button>
        </div>
      </Link>

    </nav>
  );
}

export default Navbar;