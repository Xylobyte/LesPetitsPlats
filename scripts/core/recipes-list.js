import {Recipe} from "../templates/recipe.js";

export const showList = (recipes) => {
    const recipesDOM = recipes.map(r => new Recipe(r).getCardDOM());
    document.getElementById("gallery").replaceChildren(...recipesDOM);

    updateRecipesNumber(recipes.length);
}

export const updateRecipesNumber = (total) => {
    document.getElementById("recipes-number").textContent = total + (total === 1 ? " recette" : " recettes");
}
