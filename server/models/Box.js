const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image_url: { type: String },
  // Масив посилань на інгредієнти
  ingredients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ingredient' 
  }],
  tags: [{ type: String }]
});

module.exports = mongoose.model('Box', boxSchema);