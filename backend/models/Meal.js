const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ingredients: [{
    type: String,
  }],
  servingSize: {
    type: Number,
    required: true,
  },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
