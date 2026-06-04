const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Зв'язок з користувачем (для o.user_id?.full_name та phone)
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Адреса доставки (для o.delivery_address.city та street)
  delivery_address: {
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    building: {
      type: String,
      required: false
    },
    apartment: {
      type: String,
      required: false
    }
  },
  
  payment_method: { 
    type: String, 
    enum: ['cash', 'card'], 
    default: 'cash' 
  },
  payment_status: { 
    type: String, 
    enum: ['pending', 'paid'], 
    default: 'pending' 
  },
  
  // Масив куплених боксів (базово необхідний для логіки магазину)
  items: [{
    box_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Box',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }]
}, 
// Налаштування timestamps автоматично створює поля createdAt та updatedAt
{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);