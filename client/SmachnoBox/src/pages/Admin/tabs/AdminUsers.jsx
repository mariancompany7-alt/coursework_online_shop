import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>База користувачів системи</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Повне ім'я</th>
            <th>Електронна пошта</th>
            <th>Контактний телефон</th>
            <th>Рівень доступу</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.full_name}</td>
              <td>{u.email || '—'}</td>
              <td>{u.phone || '—'}</td>
              <td>
                <span className={u.role === 'admin' ? styles.roleAdmin : styles.roleUser}>
                  {u.role.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}