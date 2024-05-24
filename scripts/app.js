import {applyFilters, filterLi, genAvailableFilters, showFilters} from "./core/filters.js";
import {showList} from "./core/recipes-list.js";
import {loopSearch} from "./search/loop-search.js";

// Global variables
// ------------------------------------------------------------------------------
let searchedRecipes = [];
let selectedFilters = [];
let availableFilters = [];

export const setSearchedRecipes = (recipes) => {
    if (recipes === searchedRecipes) return;
    searchedRecipes = recipes;

    const filteredRecipes = applyFilters();
    showList(filteredRecipes);

    availableFilters = genAvailableFilters(filteredRecipes);
    filterLi(document.querySelector('.custom-select.ing ul'), "", "ing");
    filterLi(document.querySelector('.custom-select.app ul'), "", "app");
    filterLi(document.querySelector('.custom-select.ust ul'), "", "ust");
}

export const getSearchedRecipes = () => {
    return searchedRecipes;
}

export const getSelectedFilters = () => {
    return selectedFilters;
}

export const getAvailableFilters = () => {
    return availableFilters;
}

export const addToSelectedFilters = (filter) => {
    if (!selectedFilters.find(f => f.filter === filter.filter && f.type === filter.type)) {
        selectedFilters.push(filter);
    }
    showFilters();

    const filteredRecipes = applyFilters();
    showList(filteredRecipes);

    availableFilters = genAvailableFilters(filteredRecipes);
    filterLi(document.querySelector('.custom-select.ing ul'), "", "ing");
    filterLi(document.querySelector('.custom-select.app ul'), "", "app");
    filterLi(document.querySelector('.custom-select.ust ul'), "", "ust");
}

export const removeFromSelectedFilters = (filter) => {
    selectedFilters = selectedFilters.filter(f => f.filter !== filter.filter && !f.type !== filter.type);
    showFilters();

    const filteredRecipes = applyFilters();
    showList(filteredRecipes);

    availableFilters = genAvailableFilters(filteredRecipes);
    filterLi(document.querySelector('.custom-select.ing ul'), "", "ing");
    filterLi(document.querySelector('.custom-select.app ul'), "", "app");
    filterLi(document.querySelector('.custom-select.ust ul'), "", "ust");
}

// Init view and search engine
// ------------------------------------------------------------------------------
window.addEventListener('load', () => {
    // ----- Search V1
    loopSearch('');
})

document.getElementById("search-bar").addEventListener('input', e => {
    // ----- Search V1
    loopSearch(e.target.value);
})
