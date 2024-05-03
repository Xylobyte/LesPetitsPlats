// Event listener for li filters
// ------------------------------------------------------------------------------
import {addToSelectedFilters, getAvailableFilters, getSearchedRecipes, getSelectedFilters, removeFromSelectedFilters} from "../app.js";

const addFilter = (filter, type) => {
    const obj = {
        filter,
        type: type
    }
    addToSelectedFilters(obj);
}

export const showFilters = () => {
    const filters = document.getElementById('filters');
    const els = [];

    getSelectedFilters().forEach((filter) => {
        const div = document.createElement('div');
        div.setAttribute("data-type", filter.type);

        const span = document.createElement('span');
        span.textContent = filter.filter

        const img = document.createElement('img');
        img.setAttribute('src', './assets/close.svg');
        img.addEventListener('click', () => {
            removeFromSelectedFilters(filter);
        })

        div.appendChild(span);
        div.appendChild(img);

        els.push(div);
    })

    filters.replaceChildren(...els);
}

export const genAvailableFilters = (recipes) => {
    const aFilters = {
        ing: [],
        app: [],
        ust: []
    };
    const filtersIng = new Set();
    const filtersApp = new Set();
    const filtersUst = new Set();
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient => {
            filtersIng.add(ingredient.ingredient);
        })
        recipe.ustensils.forEach(ustensil => {
            filtersUst.add(ustensil);
        })
        filtersApp.add(recipe.appliance);
    })

    aFilters.ing = Array.from(filtersIng);
    aFilters.app = Array.from(filtersApp);
    aFilters.ust = Array.from(filtersUst);

    return aFilters;
}

export const findType = (el) => {
    let type = "";
    if (el.classList.contains("ing")) type = "ing";
    if (el.classList.contains("app")) type = "app";
    if (el.classList.contains("ust")) type = "ust";

    return type;
}

export const filterLi = (ul, value, type) => {
    ul.querySelectorAll('li:not(.search)').forEach(li => li.remove());
    getAvailableFilters()[type].sort((a, b) => a.localeCompare(b)).forEach(f => {
        if (!f.toLowerCase().includes(value.toLowerCase()) && value !== "") return;
        const li = document.createElement("li");
        li.textContent = f;
        li.addEventListener('click', () => addFilter(f, type))
        ul.appendChild(li);
    })
}

export const applyFilters = () => {
    const recipes = getSearchedRecipes();

    return recipes.filter(recipe => {
        const filters = getSelectedFilters();
        let add = true;
        for (const filter of filters) {
            switch (filter.type) {
                case "ing":
                    const findI = recipe.ingredients.find(ing => ing.ingredient === filter.filter);
                    if (!findI) add = false;
                    break;
                case "app":
                    if (recipe.appliance !== filter.filter) add = false;
                    break;
                case "ust":
                    const findU = recipe.ustensils.find(ust => ust === filter.filter);
                    if (!findU) add = false;
                    break;
            }
            if (!add) break;
        }
        return add;
    });
}
