// Access the API to get a random meal, then return just the meal JSON data
const getRandomMeal = async () => {
    try {
        const result = await axios.get("https://themealdb.com/api/json/v1/1/random.php");
        return result.data.meals[0];
    } catch (error) {
        console.log(error);
    }

}

// For the 3 cards at the bottom of the home page, this generates 3 random meals
let cards = document.querySelectorAll(".card");
for (const card of cards) {
    let image = card.children[0];
    let recipeTitle = card.children[1].children[0];
    let recipeDescription = card.children[1].children[1];
    
    let randomMeal = getRandomMeal(); 
    randomMeal.then((data) => {
        //console.log(data);
        let recipeName = data.strMeal;
        let recipePhoto = data.strMealThumb;
        image.src = recipePhoto;
        recipeTitle.innerText = recipeName;
        recipeDescription.innerText = getRandomFoodDescription(data.strArea, data.strCategory);
    })

}

// This function generates a random saying for the randomly selected meals above
function getRandomFoodDescription(area, category){
    if(category === "Starter" || category === "Side" || category === "Miscellaneous")
    {
        if(area !== "Unknown")
            return `A special ${area} dish that everyone can enjoy!`;
        else
            return "This dish will sure to be a crowd pleaser!";
    }

    let randNum = (Math.floor(Math.random(1) * 6));

    switch (randNum) {
        case 0: return `This ${area} ${category} recipe is a stable that will have you craving for more!`;
        case 1: return `This classic ${area} dish will sure be a ${category} lover's favorite.`;
        case 2: return `The charm of ${area} cuisine will be present in this ${category} dish!`;
        case 3: return `Why do takeout, when you can prepare this ${area} ${category} dish in no time!`;
        case 4: return `If you love ${category}, then this ${area} dish is for you!`;
        case 5: return `This old ${area} ${category} dish will be one you simply can't get enough of!`;
        default: return "A dish so simple, yet so flavorful."
    }
}