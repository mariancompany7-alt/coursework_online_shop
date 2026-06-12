const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  weight_grams: { type: Number, required: true },
  nutritional_value: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 }
  },
  is_available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);