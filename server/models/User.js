const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: { type: String, default: 'Тернопіль' },
  street: { type: String, required: true },
  building: { type: String, required: true },
  apartment: { type: String },
  is_default: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  
  password_hash: { type: String, required: true },
  addresses: [addressSchema],
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);