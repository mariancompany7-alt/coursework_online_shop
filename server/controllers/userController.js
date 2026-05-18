const User = require('../models/User');

// Асинхронна функція для реєстрації нового користувача
exports.createUser = async (req, res) => {
  try {
    const { full_name, email, phone, password_hash } = req.body;

    // ДОДАНО: Перевірка, чи є хоча б один метод зв'язку
    if (!email && !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Будь ласка, введіть Email або Номер телефону' 
      });
    }

    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
    
    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    if (error.code === 11000) {
      // Визначаємо, що саме дублюється (email чи phone)
      const duplicateField = Object.keys(error.keyPattern)[0];
      const fieldName = duplicateField === 'email' ? 'Email' : 'Номер телефону';
      return res.status(400).json({ 
        success: false, 
        message: `Користувач з таким ${fieldName} вже існує` 
      });
    }
    res.status(400).json({ success: false, message: error.message });
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