const API_KEY = "9dcc4d02c252f5ffbbef54a2d7baf886ce09d36d";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const Item_Needed = document.createElement("li");
    Item_Needed.classList.add("recipe-item");
    foodImage = document.createElement("img");
    foodImage.src = recipe.image;
    foodImage.alt = "recipe image";

    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
        .map((ingredient) => ingredient.original)
        .join(", ")}
    `;

    recipe_Link = document.createElement("a");
    recipe_Link.href = recipe.sourceUrl;
    recipe_Link.innerText = "View Recipe";

    Item_Needed.appendChild(foodImage);
    Item_Needed.appendChild(recipeTitleEl);
    Item_Needed.appendChild(recipeIngredientsEl);
    Item_Needed.appendChild(recipe_Link);
    recipeListEl.appendChild(Item_Needed);
  });
}

async function Fetch_Recipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await Fetch_Recipes();
  displayRecipes(recipes);
}

init();