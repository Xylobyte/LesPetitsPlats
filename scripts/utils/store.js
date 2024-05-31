import {data_version} from "../data/recipes.js";
import {createHashMap} from "../search/hashmap-search.js";

const STORE_VERSION = 'version'
const STORE_DATA = 'search-hashmap'

export const getSearchHashmap = () => {
    const version = localStorage.getItem(STORE_VERSION);
    if (!version || parseInt(version) !== data_version) {
        const hashmap = createHashMap();
        localStorage.setItem(STORE_DATA, JSON.stringify(hashmap));
        localStorage.setItem(STORE_VERSION, data_version.toString());
        return hashmap;
    } else {
        return JSON.parse(localStorage.getItem(STORE_DATA));
    }
}
