// Manage input fields
// ------------------------------------------------------------------------------
import {loopSearch} from "../search/loop-search.js";
import {filterLi, findType} from "../core/filters.js";

const clearBtn = document.getElementById("clear-btn");

document.getElementById("search-bar").addEventListener('input', e => {
    const value = e.target.value;
    if (value.length > 0) clearBtn.classList.add("visible");
    else clearBtn.classList.remove("visible");
})

clearBtn.addEventListener('click', e => {
    document.getElementById("search-bar").value = "";
    loopSearch('');
    clearBtn.classList.remove('visible');
})

document.querySelectorAll(".custom-select .search input").forEach(el => {
    const liCt = el.parentElement;
    const btn = el.parentElement.querySelector("button.clear-btn");
    const obj = el.parentElement.parentElement.parentElement.parentElement;

    el.addEventListener('input', e => {
        const value = e.target.value;
        if (value.length > 0) btn.classList.add("visible");
        else btn.classList.remove("visible");
        filterLi(liCt.parentElement, value, findType(obj));
    })

    liCt.addEventListener('click', e => {
        e.stopPropagation();
    })

    btn.addEventListener('click', e => {
        el.value = "";
        btn.classList.remove('visible');
        filterLi(liCt.parentElement, '', findType(obj));
    })
})

document.querySelectorAll(".custom-select > button").forEach(e => {
    e.addEventListener('click', (evt) => {
        evt.stopPropagation();
        const isOpen = e.parentElement.classList.contains("open")
        document.querySelectorAll(".custom-select").forEach(obj => {
            if (obj.classList.contains("open")) {
                obj.classList.remove("open");
                obj.querySelector('.search input').value = "";
                filterLi(obj.querySelector('ul'), "", findType(obj));
            }
        })
        !isOpen && e.parentElement.classList.add("open");
    })
})

document.body.addEventListener('click', (evt) => {
    document.querySelectorAll(".custom-select").forEach(e => {
        if (!e.classList.contains("open")) return;
        e.classList.remove("open");
        e.querySelector('.search input').value = "";
        filterLi(e.querySelector('ul'), "", findType(e));
    })
})
