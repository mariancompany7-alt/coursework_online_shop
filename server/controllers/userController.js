const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d',
  });
};

exports.createUser = async (req, res) => {
  try {
    const { email, phone, password, password_hash } = req.body;
    
    const incomingPassword = password || password_hash; 

    if (!email && !phone) {
      return res.status(400).json({ success: false, message: 'Введіть Email або Номер телефону' });
    }

    if (!incomingPassword) {
      return res.status(400).json({ success: false, message: 'Введіть пароль' });
    }

    if (!PASSWORD_REGEX.test(incomingPassword)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Пароль надто простий! Має бути від 6 символів, містити велику, малу літеру та цифру.' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(incomingPassword, salt);

    const userData = { ...req.body, password_hash: hashedPassword };
    delete userData.password;

    const newUser = new User(userData); 
    const savedUser = await newUser.save();
    
    const token = generateToken(savedUser._id);

    res.status(201).json({ 
      success: true, 
      token,
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
    const { email, phone, password, password_hash } = req.body;
    const incomingPassword = password || password_hash;

    if (!email && !phone) {
      return res.status(400).json({ success: false, message: 'Введіть Email або Номер телефону' });
    }

    if (!incomingPassword) {
      return res.status(400).json({ success: false, message: 'Введіть пароль' });
    }

    const query = email ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Користувача не знайдено' });
    }

    const isMatch = await bcrypt.compare(incomingPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Невірний пароль' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ 
      success: true, 
      message: 'Вхід успішний!', 
      token,
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