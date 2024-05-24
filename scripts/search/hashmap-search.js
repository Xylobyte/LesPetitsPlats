import {recipes} from "../data/recipes.js";
import {setSearchedRecipes} from "../app.js";
import {cleanString} from "../utils/strings.js";
import {getSearchHashmap} from "../utils/store.js";

export const createHashMap = () => {
    const map = {};

    recipes.forEach(recipe => {
        const {id, name, description, ingredients} = recipe;

        const searchableArray = [name, description];
        searchableArray.push(...ingredients.map(i => i.ingredient));

        const searchableText = cleanString(searchableArray.join(' ')).toLowerCase();

        const words = searchableText.split(/\W+/);

        words.forEach(word => {
            for (let i = 1; i <= word.length; i++) {
                const substring = word.substring(0, i);
                if (!map[substring]) {
                    map[substring] = new Set();
                }
                map[substring].add(id);
            }
        });
    });

    for (let key in map) {
        map[key] = Array.from(map[key]);
    }

    return map;
};

export const hashmapSearch = (search) => {
    const hashmap = getSearchHashmap();

    if (search.length < 3 || hashmap === undefined) {
        setSearchedRecipes(recipes);
    } else {
        const queryWords = cleanString(search).toLowerCase().trim().split(/\W+/);
        const results = queryWords.map(word => hashmap[word] || []);

        if (results.length === 0) {
            setSearchedRecipes([]);
            return;
        }
        const intersection = results.reduce((a, b) => a.filter(c => b.includes(c)));

        setSearchedRecipes(recipes.filter(r => intersection.includes(r.id)));
    }
}
