import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Якщо токена немає або роль не 'admin', повертаємо на головну сторінку
  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Якщо користувач — адмін, рендеримо вкладені маршрути (адмінку)
  return <Outlet />;
};

export default AdminRoute;