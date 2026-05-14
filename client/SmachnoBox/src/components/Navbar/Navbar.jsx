import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <ul>
      <li><Link to="/">Головна</Link></li>
      <li><a href="#about">Про нас</a></li>
      <li><a href="#menu">Меню</a></li>
      <li><a href="#contact">Контакти</a></li>
    </ul>
  );
}

export default Navbar;