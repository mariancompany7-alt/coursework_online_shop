const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      return res.status(400).json({ success: false, message: 'Введіть Email або Номер телефону' });
    }
    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
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

    res.status(200).json({ success: true, message: 'Вхід успішний!', user });
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