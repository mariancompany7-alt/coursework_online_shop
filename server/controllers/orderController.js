const Order = require('../models/Order');

// 1. СТВОРЕННЯ НОВОГО ЗАМОВЛЕННЯ (Для покупця)
exports.createOrder = async (req, res) => {
  try {
    // ЗАХИСТ: Якщо роль користувача - адмін, блокуємо створення замовлення
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: 'Адміністратори не можуть оформлювати замовлення як клієнти.' });
    }

    const { delivery_address, total_amount, items } = req.body;

    const newOrder = new Order({
      user_id: req.user._id,
      delivery_address,
      total_amount,
      items
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Помилка створення замовлення:', error);
    res.status(500).json({ message: 'Помилка створення замовлення', error: error.message });
  }
};

// 2. ОТРИМАННЯ ЗАМОВЛЕНЬ ПОТОЧНОГО КОРИСТУВАЧА (Для кабінету покупця)
exports.getUserOrders = async (req, res) => {
  try {
    // Шукаємо замовлення тільки цього юзера і сортуємо від найновіших
    const orders = await Order.find({ user_id: req.user._id })
      .populate('items.box_id', 'title image_url') // Підтягуємо назви боксів для красивого відображення
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Помилка завантаження ваших замовлень', error: error.message });
  }
};

// Отримати всі замовлення
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user_id', 'full_name phone email')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Помилка завантаження замовлень', error: error.message });
  }
};

// Оновити статус замовлення
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Замовлення не знайдено' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Помилка зміни статусу', error: error.message });
  }
};

// Видалити замовлення
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Замовлення успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка видалення замовлення', error: error.message });
  }
};