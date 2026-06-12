const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  delivery_address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: false },
    apartment: { type: String, required: false }
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

  status: { 
    type: String, 
    enum: ['pending', 'processing', 'delivering', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  total_amount: { 
    type: Number, 
    required: true 
  },
  
  items: [{
    box_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Box',
      required: true
    },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);