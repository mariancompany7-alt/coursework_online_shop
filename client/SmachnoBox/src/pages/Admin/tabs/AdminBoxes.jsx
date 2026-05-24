import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBoxes = () => {
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchBoxes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/boxes');
      setBoxes(res.data);
    } catch (error) {
      console.error("Помилка при завантаженні боксів", error);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/boxes/${editId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/boxes', formData, config);
      }
      setFormData({ name: '', price: '', description: '' });
      setIsEditing(false);
      setEditId(null);
      fetchBoxes(); // Оновлюємо список після змін
    } catch (error) {
      console.error("Помилка при збереженні боксу", error);
      alert("Помилка збереження. Перевірте консоль.");
    }
  };

  const handleEdit = (box) => {
    setFormData({ name: box.name, price: box.price, description: box.description });
    setIsEditing(true);
    setEditId(box._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей бокс?")) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/boxes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBoxes();
    } catch (error) {
      console.error("Помилка при видаленні боксу", error);
    }
  };

  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" name="name" placeholder="Назва боксу" 
          value={formData.name || ''} onChange={handleInputChange} required 
          style={{ padding: '8px', flex: 1 }}
        />
        <input 
          type="number" name="price" placeholder="Ціна" 
          value={formData.price || ''} onChange={handleInputChange} required 
          style={{ padding: '8px', width: '100px' }}
        />
        <input 
          type="text" name="description" placeholder="Опис" 
          value={formData.description || ''} onChange={handleInputChange} required 
          style={{ padding: '8px', flex: 2 }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: isEditing ? '#f39c12' : '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isEditing ? 'Оновити' : 'Додати'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => { setIsEditing(false); setFormData({name: '', price: '', description: ''}) }} style={{ padding: '8px', background: '#95a5a6', color: 'white', border: 'none', cursor: 'pointer' }}>
            Скасувати
          </button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Назва</th>
            <th style={{ padding: '12px' }}>Опис</th>
            <th style={{ padding: '12px' }}>Ціна</th>
            <th style={{ padding: '12px' }}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map(b => (
            <tr key={b._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{b.name}</td>
              <td style={{ padding: '12px' }}>{b.description}</td>
              <td style={{ padding: '12px' }}>{b.price} грн</td>
              <td style={{ padding: '12px' }}>
                <button onClick={() => handleEdit(b)} style={{ marginRight: '8px', cursor: 'pointer' }}>Редагувати</button>
                <button onClick={() => handleDelete(b._id)} style={{ color: 'red', cursor: 'pointer' }}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBoxes;