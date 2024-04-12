import {searchV1} from "./search/search-v1.js";
import {showList} from "./core/recipes-list.js";

// Global variables
// ------------------------------------------------------------------------------
let searchedRecipes = [];
let selectedFilters = [];
let availableFilters = [];

export const setSearchedRecipes = (recipes) => {
    if (recipes === searchedRecipes) return;

    searchedRecipes = recipes;
    showList(searchedRecipes);
}

// Init view and search engine
// ------------------------------------------------------------------------------
window.addEventListener('load', () => {
    searchV1('');
})

document.getElementById("search-bar").addEventListener('input', e => {
    searchV1(e.target.value);
})
