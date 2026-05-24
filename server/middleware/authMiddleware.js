const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Перевіряємо, чи є токен у заголовках (формат: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Розшифровуємо токен (потрібен секретний ключ з .env)
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
      
      // Знаходимо користувача за ID з токена, виключаючи пароль
      req.user = await User.findById(decoded.id).select('-password_hash');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Не авторизовано, токен недійсний' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Не авторизовано, немає токена' });
  }
};

const isAdmin = (req, res, next) => {
  // Перевіряємо, чи роль користувача 'admin' (як вказано у твоїй моделі)
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Немає доступу. Потрібні права адміністратора.' });
  }
};

module.exports = { protect, isAdmin };