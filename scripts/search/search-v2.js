import {recipes} from "../data/recipes.js";
import {setSearchedRecipes} from "../app.js";
import {cleanString} from "../utils/strings.js";

let hashmap = undefined;

export const createHashMap = () => {
    const map = {};

    recipes.forEach(recipe => {
        const {id, name, description, ingredients} = recipe;

        const searchableArray = [name, description];
        searchableArray.push(...ingredients.map(i => i.ingredient));

        const searchableText = cleanString(searchableArray.join(' ')).toLowerCase();

        const words = searchableText.split(/\W+/);

        words.forEach(word => {
            if (word.length < 2) {
                if (!map[word]) {
                    map[word] = new Set();
                }
                map[word].add(id);
                return;
            }

            for (let i = 2; i <= word.length; i++) {
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

    hashmap = map;
};

export const searchV2 = (search) => {
    const cleanedSearch = cleanString(search).toLowerCase();

    if (search.length < 3) {
        setSearchedRecipes(recipes);
    } else {
        const queryWords = cleanString(search).toLowerCase().trim().split(/\W+/);
        const results = queryWords.map(word => hashmap[word] || []);

        // Find intersection of all sets
        if (results.length === 0) {
            setSearchedRecipes([]);
        }
        const intersection = results.reduce((a, b) => a.filter(c => b.includes(c)));

        setSearchedRecipes(recipes.filter(r => intersection.includes(r.id)));
    }
}
