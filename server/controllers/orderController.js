const Order = require('../models/Order');

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