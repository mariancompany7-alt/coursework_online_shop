import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminBoxes() {
  const [boxes, setBoxes] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  const loadBoxes = async () => {
    const res = await fetch('http://localhost:5000/api/boxes');
    if (res.ok) setBoxes(await res.json());
  };

  useEffect(() => { loadBoxes(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editId ? `http://localhost:5000/api/boxes/${editId}` : 'http://localhost:5000/api/boxes';
    
    const res = await fetch(url, {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ name: '', price: '', description: '' });
      setEditId(null);
      loadBoxes();
    }
  };

  const deleteBox = async (id) => {
    if (!window.confirm("Видалити товар?")) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/boxes/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) loadBoxes();
  };

  return (
    <div className={styles.tabContainer}>
      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <input className={styles.input} style={{ flex: 1 }} placeholder="Назва" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className={styles.input} style={{ width: '100px' }} type="number" placeholder="Ціна" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input className={styles.input} style={{ flex: 2 }} placeholder="Опис" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <button className={styles.btn} type="submit">{editId ? 'Зберегти' : 'Додати'}</button>
        {editId && <button className={`${styles.btn} ${styles.btnSecondary}`} type="button" onClick={() => { setEditId(null); setForm({name:'', price:'', description:''}); }}>Скасувати</button>}
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Ціна</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map(b => (
            <tr key={b._id}>
              <td><b>{b.name}</b></td>
              <td>{b.description}</td>
              <td>{b.price} ₴</td>
              <td>
                <div className={styles.actionsGroup}>
                  <button 
                    className={`${styles.btn} ${styles.btnSecondary}`} 
                    onClick={() => { setForm(b); setEditId(b._id); }}
                  >
                    Редагувати
                  </button>
                  <button 
                    className={`${styles.btn} ${styles.btnDanger}`} 
                    onClick={() => deleteBox(b._id)}
                  >
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}