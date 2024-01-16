const API_KEY = "afdf4197910041fe9271bd95395a5454";
const recipeListEl = document.getElementById("recipe-list");

function displayCards(recipes)
{
  recipeListEl.innerHTML = ""
  
  recipes.forEach((r)=>{
      var card = `<div class="card w-96 bg-base-100 shadow-xl mt-5 animate__animated animate__backInUp">
      ${ r.image ? `<figure><img src="${r.image}" alt="Recipe Image" /></figure>` : `  <div class="skeleton h-64 w-full"></div>
      `}
      <div class="card-body">
        <h2 class="card-title">${r.title}</h2>
        <p class="line-clamp-3"><strong>Ingredients:</strong> ${r.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}</p>
        <div class="card-actions justify-end">
          <a href="${r.sourceUrl}" target="_blank" class="btn btn-primary">Read</a>
        </div>
      </div>
    </div>`

    recipeListEl.insertAdjacentHTML("beforeend", card);
  })
}

async function Fetch_Recipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  // Check if cached data exists in sessionStorage
  const cachedRecipesJSON = sessionStorage.getItem('cachedRecipes');
  let recipes;

  if (!cachedRecipesJSON) {
    console.log("Calling API");
    recipes = await Fetch_Recipes();

    // Cache the fetched data in sessionStorage
    sessionStorage.setItem('cachedRecipes', JSON.stringify(recipes));
  } else {
    console.log("Using cached data");
    recipes = JSON.parse(cachedRecipesJSON);
  }
  displayCards(recipes);
}


init();