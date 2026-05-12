const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./server/config/db');
const path = require('path');
const { port } = require('./server/config/config');

const app = express();

// Вбудований middleware для розпізнавання вхідних запитів як об'єктів JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Імпорт маршрутів
const userRoutes = require('./server/routes/userRoutes');
const boxRoutes = require('./server/routes/boxRoutes'); // Додали імпорт

// Підключення маршрутів до базового URL
app.use('/api/users', userRoutes);
app.use('/api/boxes', boxRoutes); // Додали підключення

connectDB();

// Підключення маршрутів до базового URL
app.use('/api/users', userRoutes);
app.use('/api/boxes', boxRoutes);

app.get('/', (req, res) => {
    res.send('Бекенд SmachnoBox працює успішно!');
});

// Підключення до MongoDB (переконайтеся, що ви використовуєте ваш URI)
app.listen(port, () => console.log(`Сервер запущено на порту http://localhost:${port}`));