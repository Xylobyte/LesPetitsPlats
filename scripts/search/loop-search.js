import {recipes} from "../data/recipes.js";
import {setSearchedRecipes} from "../app.js";
import {cleanString} from "../utils/strings.js";

export const loopSearch = (search) => {
    if (search.length < 3) {
        setSearchedRecipes(recipes);
    } else {
        const cleanedSearch = cleanString(search).toLowerCase();
        const tmpList = [];

        for (const recipe of recipes) {
            const concat = cleanString(`${recipe.name} ${recipe.description}`).toLowerCase();
            if (concat.includes(cleanedSearch)) tmpList.push(recipe);
            else {
                for (const ingredient of recipe.ingredients) {
                    if (cleanString(ingredient.ingredient).toLowerCase().includes(cleanedSearch)) tmpList.push(recipe);
                }
            }
        }

        setSearchedRecipes(tmpList);
    }
}
