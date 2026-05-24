import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminBoxes() {
  const [boxes, setBoxes] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  const loadBoxes = async () => {
    const res = await fetch('http://localhost:5000/api/boxes');
    if (res.ok) {
      const data = await res.json();
      setBoxes(data);
    }
  };

  useEffect(() => { loadBoxes(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editId ? `http://localhost:5000/api/boxes/${editId}` : 'http://localhost:5000/api/boxes';
    
    const res = await fetch(url, {
      method: editId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ name: '', price: '', description: '' });
      setEditId(null);
      loadBoxes();
    }
  };

  const deleteBox = async (id) => {
    if (!window.confirm("Видалити цей бокс з каталогу?")) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/boxes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) loadBoxes();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Управління каталогом товарів</h2>
      
      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <input className={styles.input} style={{ flex: 1 }} placeholder="Назва боксу" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className={styles.input} style={{ width: '120px' }} type="number" placeholder="Ціна" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input className={styles.input} style={{ flex: 2 }} placeholder="Опис наповнення" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">{editId ? 'Зберегти' : '+ Додати'}</button>
        {editId && <button className={`${styles.btn} ${styles.btnSecondary}`} type="button" onClick={() => { setEditId(null); setForm({name:'', price:'', description:''}); }}>Скасувати</button>}
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва боксу</th>
            <th>Опис компонентів</th>
            <th>Вартість</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map(b => (
            <tr key={b._id}>
              <td className={styles.colBold}>{b.name}</td>
              <td>{b.description}</td>
              <td className={styles.colPrice}>{b.price} ₴</td>
              <td>
                <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ marginRight: '6px' }} onClick={() => { setForm(b); setEditId(b._id); }}>Редагувати</button>
                <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => deleteBox(b._id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}