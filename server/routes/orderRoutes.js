const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// === 1. МАРШРУТИ ДЛЯ ПОКУПЦЯ (Клієнтська частина) ===
// Створення нового замовлення при Checkout
router.post('/', protect, orderController.createOrder); 

// Отримання замовлень для Особистого кабінету покупця
router.get('/myorders', protect, orderController.getUserOrders); 


// === 2. МАРШРУТИ ДЛЯ АДМІНІСТРАТОРА (Адмін-панель) ===
router.get('/', protect, isAdmin, orderController.getAllOrders);
router.put('/:id/status', protect, isAdmin, orderController.updateOrderStatus);
router.delete('/:id', protect, isAdmin, orderController.deleteOrder);

module.exports = router;