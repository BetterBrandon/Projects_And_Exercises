import { default as Meal } from "./test";

let m = new Meal();

console.log("app.js");
// For the 3 cards at the bottom of the home page, this generates 3 random meals
let cards = document.querySelectorAll(".card");
for (const card of cards) {
  let image = card.children[0];
  let recipeTitle = card.children[1].children[0];
  let recipeDescription = card.children[1].children[1];
  let button = card.children[1].children[2];

  let randomMeal = meal.getRandomMeal();

  randomMeal.then((data) => {
    console.log(data);
    let recipeName = data.strMeal;
    let recipePhoto = data.strMealThumb;
    let recipeId = data.idMeal;
    image.src = recipePhoto;
    recipeTitle.innerText = recipeName;
    recipeDescription.innerText = meal.getRandomFoodDescription(
      data.strArea,
      data.strCategory
    );
    button.href = `/recipe/${recipeId}`;

    // let button = card.children[1].children[2];
    // button.addEventListener("click", function(e){
    //     console.log(`${recipeName} button clicked!`);
    // })
  });
}
