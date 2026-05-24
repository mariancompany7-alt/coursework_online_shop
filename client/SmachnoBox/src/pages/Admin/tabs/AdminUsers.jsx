// client/SmachnoBox/src/pages/Admin/tabs/AdminUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Помилка при завантаженні користувачів", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Ім'я</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Телефон</th>
            <th style={{ padding: '12px' }}>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{u.full_name}</td>
              <td style={{ padding: '12px' }}>{u.email || '—'}</td>
              <td style={{ padding: '12px' }}>{u.phone || '—'}</td>
              <td style={{ padding: '12px' }}><span style={{ color: u.role === 'admin' ? '#e74c3c' : '#2ecc71', fontWeight: 'bold' }}>{u.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;