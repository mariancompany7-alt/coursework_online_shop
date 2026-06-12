import React, { useEffect, useState } from 'react';
import styles from './AdminTabs.module.css';

export default function AdminBoxes() {
  const [boxes, setBoxes] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', description: '', image_url: '', tags: '' });
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
    
    const submissionData = {
      ...form,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map(tag => tag.trim()) : form.tags
    };

    const res = await fetch(url, {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(submissionData)
    });

    if (res.ok) {
      setForm({ title: '', price: '', description: '', image_url: '', tags: '' });
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
      <form onSubmit={handleSubmit} className={styles.formGroup} style={{ flexWrap: 'wrap', gap: '10px' }}>
        <input className={styles.input} style={{ flex: '1 1 200px' }} placeholder="Назва (Title)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input className={styles.input} style={{ width: '100px' }} type="number" placeholder="Ціна" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input className={styles.input} style={{ flex: '2 1 300px' }} placeholder="Опис" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <input className={styles.input} style={{ flex: '1 1 200px' }} placeholder="URL зображення" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
        <input className={styles.input} style={{ flex: '1 1 200px' }} placeholder="Теги (через кому)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
        
        <button className={styles.btn} type="submit">{editId ? 'Зберегти' : 'Додати'}</button>
        {editId && <button className={`${styles.btn} ${styles.btnSecondary}`} type="button" onClick={() => { setEditId(null); setForm({title:'', price:'', description:'', image_url:'', tags:''}); }}>Скасувати</button>}
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Ціна</th>
            <th>Склад</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map(b => (
            <tr key={b._id}>
              <td>
                {b.image_url ? (
                  <img src={b.image_url} alt={b.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>Немає</div>
                )}
              </td>

              <td><b>{b.title || b.name}</b></td>
              <td>{b.description}</td>
              <td>{b.price} ₴</td>
              <td>{b.ingredients ? `${b.ingredients.length} інгр.` : '0 інгр.'}</td>
              <td>
                <div className={styles.actionsGroup}>
                  <button 
                    className={`${styles.btn} ${styles.btnSecondary}`} 
                    onClick={() => { 
                      setForm({
                        title: b.title || b.name || '', 
                        price: b.price || '', 
                        description: b.description || '',
                        image_url: b.image_url || '',
                        tags: b.tags ? b.tags.join(', ') : ''
                      }); 
                      setEditId(b._id); 
                    }}
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