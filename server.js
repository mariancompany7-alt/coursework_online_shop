const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./server/config/db');
const { port } = require('./server/config/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

connectDB();

const userRoutes = require('./server/routes/userRoutes');
const boxRoutes = require('./server/routes/boxRoutes');
const orderRoutes = require('./server/routes/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Бекенд SmachnoBox працює успішно!');
});

app.listen(port, () => console.log(`Сервер запущено на порту http://localhost:${port}`));