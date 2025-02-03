const apiUrl = 'http://localhost:5000/api/meals';

const mealTable = document.getElementById('mealTable').getElementsByTagName('tbody')[0];
const addMealForm = document.getElementById('addMealForm');

async function fetchMeals() {
  try {
    const response = await fetch(apiUrl);
    const meals = await response.json();
    renderMeals(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
}

function renderMeals(meals) {
  mealTable.innerHTML = '';
  meals.forEach(meal => {
    const row = mealTable.insertRow();
    row.innerHTML = `
      <td>${meal.name}</td>
      <td>${meal.calories}</td>
      <td>${new Date(meal.date).toLocaleDateString()}</td>
      <td>${meal.ingredients.join(', ')}</td>
      <td>${meal.servingSize}</td>
      <td>
        <button onclick="deleteMeal('${meal._id}')">Usuń</button>
      </td>
    `;
  });
}

addMealForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const calories = document.getElementById('calories').value;
  const date = document.getElementById('date').value;
  const ingredients = document.getElementById('ingredients').value.split(',');
  const servingSize = document.getElementById('servingSize').value;

  try {
    const newMeal = { name, calories, date, ingredients, servingSize };
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMeal),
    });
    fetchMeals();
  } catch (error) {
    console.error('Error adding meal:', error);
  }
});

async function deleteMeal(id) {
  try {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchMeals();
  } catch (error) {
    console.error('Error deleting meal:', error);
  }
}

fetchMeals();
