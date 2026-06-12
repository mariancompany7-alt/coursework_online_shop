const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
      
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
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Немає доступу. Потрібні права адміністратора.' });
  }
};

module.exports = { protect, isAdmin };