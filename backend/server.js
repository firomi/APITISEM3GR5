const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mealRoutes = require('./api/meals');
const app = express();
const Meal = require('./models/Meal');
const mealsData = require('./meals.json');
app.use(express.json());
app.use(cors());
const port = 5000; 
const mongoUri = "mongodb://root:example@mongo:27017/calorietracker?authSource=admin"
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
      return Meal.insertMany(mealsData);
    })
    .then(() => {
      console.log('Meals data inserted');
    })
    .catch(err => {
      console.log('Error connecting to MongoDB:', err);
    });
app.use('/api', mealRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});