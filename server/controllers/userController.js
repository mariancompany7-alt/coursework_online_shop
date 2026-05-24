const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Імпортуємо бібліотеку для токенів

// Допоміжна функція для генерації JWT-токена
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d', // Токен буде дійсним 30 днів
  });
};

exports.createUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      return res.status(400).json({ success: false, message: 'Введіть Email або Номер телефону' });
    }
    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
    
    // Генеруємо токен для нового користувача
    const token = generateToken(savedUser._id);

    res.status(201).json({ 
      success: true, 
      token, // Відправляємо токен на фронтенд
      user: {
        _id: savedUser._id,
        full_name: savedUser.full_name,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const fieldName = duplicateField === 'email' ? 'Email' : 'Номер телефону';
      return res.status(400).json({ success: false, message: `Користувач з таким ${fieldName} вже існує` });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, phone, password_hash } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ success: false, message: 'Введіть Email або Номер телефону' });
    }

    // Шукаємо користувача
    const query = email ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Користувача не знайдено' });
    }

    // Перевіряємо пароль
    if (user.password_hash !== password_hash) {
      return res.status(400).json({ success: false, message: 'Невірний пароль' });
    }

    // Генеруємо токен при успішному вході
    const token = generateToken(user._id);

    res.status(200).json({ 
      success: true, 
      message: 'Вхід успішний!', 
      token, // Відправляємо токен на фронтенд
      user: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};