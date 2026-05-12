const mongoose = require('mongoose');

/**
 * Схема окремого елемента в замовленні.
 * Дозволяє комбінувати готові бокси та індивідуальні набори з конструктора.
 */
const orderItemSchema = new mongoose.Schema({
  item_type: { 
    type: String, 
    enum: ['premade_box', 'custom_build'], 
    required: true 
  },
  // Ідентифікатор готового набору (якщо обрано premade_box)
  box_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Box' 
  },
  // Масив ідентифікаторів компонентів (якщо обрано custom_build)
  selected_ingredients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ingredient' 
  }],
  quantity: { 
    type: Number, 
    required: true, 
    min: 1, 
    default: 1 
  },
  // Фіксація вартості на момент транзакції для фінансової звітності
  price_at_purchase: { 
    type: Number, 
    required: true 
  }
});

/**
 * Основна схема замовлення.
 * Використовує вбудовану адресу для збереження історичної точності.
 */
const orderSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'delivering', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  // Масив елементів замовлення на основі orderItemSchema
  items: [orderItemSchema],
  
  total_amount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  
  // Статичні дані доставки (копіюються з профілю користувача при оформленні)
  delivery_address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
    apartment: { type: String }
  },
  
  delivery_time: { 
    type: Date, 
    required: true 
  }
}, { 
  timestamps: true // Автоматичне логування часу створення (createdAt)
});

// Експорт моделі для використання в контролерах
module.exports = mongoose.model('Order', orderSchema);