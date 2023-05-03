const express = require("express");
const app = express();
const path = require("path");
//const { CLIENT_RENEG_LIMIT } = require("tls");
const Meal = require("./public/test");

let meal = new Meal();

// const Meal = require(path.join(__dirname, "/public/Meal"));
// let meal = new Meal();

// Setting the templating as EJS and letting EJS know where we
// keep the views at
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// This is how the view's get their scripts and potential css
app.use(express.static(path.join(__dirname, "/public")));

app.listen(3000, () => {
  console.log("Listening to project Recipe_Website/V2 on port 3000");
});

app.get("/", (request, response) => {
  let arr = meal.threeRandomMeals();
  // console.log(arr);
  arr.then((data) => {
    console.log(data[0]);
    const foodDescriptions = meal.getThreeFoodDescriptions(data);
    //console.log(foodDescriptions);
    console.log("/ route is being called");
    response.render("home", { data, foodDescriptions });
  });
});

app.get("/categories", (request, response) => {
  let categories = meal.getMealCategories();
  categories.then((data) => {
    console.log(data);
    response.render("categories", { data });
  });
});

app.get("/recipe/:mealId", (request, response) => {
  console.log("/recipe/:meal is being called", request.originalUrl);
  const { mealId } = request.params;
  console.log("request.params", request.params);
  console.log("mealid:", mealId);
  let foundMeal = meal.getMealFromId(mealId);
  foundMeal.then((data) => {
    //console.log(data);
    let test = test1(data);
    console.log("test variable ", test);
    response.render("recipe", { data, test });
  });
});

function test1(data) {
  const regex1 = /strIngredient/;
  const regex2 = /strMeasure/;
  let collection = { ingredients: [], measures: [] };
  for (let key of Object.keys(data || {})) {
    if (data[key] !== null) {
      console.log("log:", key, data[key]);
      if (regex1.test(key)) {
        if (data[key] !== "") {
          collection.ingredients.push(data[key]);
        }
      }
      if (regex2.test(key)) {
        if (data[key] !== "") {
          collection.measures.push(data[key]);
        }
      }
    }
  }
  console.log("in test function", collection.ingredients.length);
  return collection;
}

// TODO:
// Create functionality for SHOW(recipe) page
// Move test1 function to Meal class
// Add searchabilty in the Nav Bar
// HAve a categories page, where the user can select the categories they want
