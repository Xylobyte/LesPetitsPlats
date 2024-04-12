import {recipes} from "../data/recipes.js";
import {setSearchedRecipes} from "../app.js";

export const searchV1 = (search) => {
    const cleanedSearch = cleanString(search).toLowerCase();

    if (search.length < 3) {
        setSearchedRecipes(recipes);
    } else {
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

const removeAccents = input => input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const removeSpecialChars = input => input.replace(/[^\w\s]/gi, "");

const cleanString = (input) => {
    const withoutAccents = removeAccents(input);
    return removeSpecialChars(withoutAccents);
}
