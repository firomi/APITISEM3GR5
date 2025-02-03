const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
router.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/meals', async (req, res) => {
  const { name, calories, date, ingredients, servingSize } = req.body;
  const meal = new Meal({ name, calories, date, ingredients, servingSize });

  try {
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete('/meals/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
