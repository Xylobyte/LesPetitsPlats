// Manage input fields
// ------------------------------------------------------------------------------
const clearBtn = document.getElementById("clear-btn");

document.getElementById("search-bar").addEventListener('input', e => {
    const value = e.target.value;
    if (value.length > 0) clearBtn.classList.add("visible");
    else clearBtn.classList.remove("visible");
})

clearBtn.addEventListener('click', e => {
    document.getElementById("search-bar").value = "";
    searchV1('');
    clearBtn.classList.remove('visible');
})

document.querySelectorAll(".custom-select .search input").forEach(el => {
    el.addEventListener('input', e => {
        const value = e.target.value;
        const btn = el.parentElement.querySelector("button.clear-btn")
        if (value.length > 0) btn.classList.add("visible");
        else btn.classList.remove("visible");
    })
    el.parentElement.addEventListener('click', e => {
        e.stopPropagation();
    })
    const btn = el.parentElement.querySelector("button.clear-btn");
    btn.addEventListener('click', e => {
        el.value = "";
        btn.classList.remove('visible');
    })
})

document.querySelectorAll(".custom-select > button").forEach(e => {
    e.addEventListener('click', (evt) => {
        evt.stopPropagation();
        document.querySelectorAll(".custom-select").forEach(obj => {
            if (obj !== e.parentElement) obj.classList.remove("open");
        })
        e.parentElement.classList.toggle("open");
    })
})

document.body.addEventListener('click', (evt) => {
    document.querySelectorAll(".custom-select").forEach(e => {
        e.classList.remove("open");
    })
})
