const mongoose = require('mongoose');

// Допоміжна схема адреси
const addressSchema = new mongoose.Schema({
  city: { type: String, default: 'Тернопіль' },
  street: { type: String, required: true },
  building: { type: String, required: true },
  apartment: { type: String },
  is_default: { type: Boolean, default: false } // Позначка головної адреси
});

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, sparse: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String, sparse: true, unique: true },

  // Вбудований масив адрес (1-до-багатьох)
  addresses: [addressSchema],

  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);