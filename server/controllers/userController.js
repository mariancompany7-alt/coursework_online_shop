const User = require('../models/User');

// Асинхронна функція для реєстрації нового користувача
exports.createUser = async (req, res) => {
  try {
    // req.body міститиме дані, відправлені з фронтенду (у форматі JSON)
    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
    
    // Повертаємо статус 201 (Created) та збережений об'єкт
    res.status(201).json(savedUser);
  } catch (error) {
    // Якщо валідація Mongoose не пройдена, повертаємо помилку 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};

// Функція для отримання всіх користувачів
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};