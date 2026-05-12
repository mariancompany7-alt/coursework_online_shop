const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Підключено до MongoDB');
        
    } catch (error) {
        console.error('Помилка підключення до БД:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;