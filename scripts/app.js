document.getElementById("search-bar").addEventListener('input', e => {
    const value = e.target.value
    const clearBtn =document.getElementById("clear-btn");
    if (value.length > 0) clearBtn.classList.add("visible");
    else clearBtn.classList.remove("visible");
})

document.querySelectorAll(".custom-select button").forEach(e => {
    e.addEventListener('click', () => {
        e.parentElement.classList.toggle("open");
    })
})