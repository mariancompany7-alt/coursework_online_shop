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
      if (res.ok) setUsers(await res.json());
    };
    fetchUsers();
  }, []);

  return (
    <div className={styles.tabContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Повне ім'я</th>
            <th>Електронна пошта</th>
            <th>Контактний телефон</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.full_name}</td>
              <td>{u.email || '—'}</td>
              <td>{u.phone || '—'}</td>
              <td>
                <span style={{ color: u.role === 'admin' ? '#e74c3c' : '#2ecc71', fontWeight: 'bold' }}>
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