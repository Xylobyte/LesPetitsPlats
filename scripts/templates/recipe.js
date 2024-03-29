export class Recipe {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
    }

    getCardDOM() {
        const card = document.createElement('div');
        card.classList.add('recipe-card', 'flex', 'column', 'border-r20', 'b-shadow-large');

        const time = document.createElement('span');
        time.classList.add('time', 'border-r20');
        time.textContent = `${this.time}min`;
        card.appendChild(time);

        const img = document.createElement('img');
        img.src = `assets/images/${this.image}`;
        card.appendChild(img);

        const ctInfo = document.createElement('div');
        ctInfo.classList.add('ct-info', 'flex', 'column', 'gap20');
        card.appendChild(ctInfo);

        const name = document.createElement('h3');
        name.textContent = this.name;
        ctInfo.appendChild(name);

        const ctDesc = document.createElement('div');
        ctDesc.classList.add('flex', 'column', 'gap5');
        ctInfo.appendChild(ctDesc);

        const spanRrecette = document.createElement('h4');
        spanRrecette.textContent = `RECETTE`;
        ctDesc.appendChild(spanRrecette);

        const pDesc = document.createElement('p');
        const descSplit = this.description.split(' ');
        pDesc.textContent = descSplit.slice(0, 30).join(' ') + (descSplit.length > 30 ? '...' : '');
        ctDesc.appendChild(pDesc);

        const ctIng = document.createElement('div');
        ctIng.classList.add('flex', 'column', 'gap5');
        ctInfo.appendChild(ctIng);

        const spanIngredients = document.createElement('h4');
        spanIngredients.textContent = `INGREDIENTS`;
        ctIng.appendChild(spanIngredients);

        const gridIng = document.createElement('div');
        gridIng.classList.add('grid');
        ctIng.appendChild(gridIng);

        this.ingredients.forEach(ingredient => {
            const div = document.createElement('div');
            div.classList.add('ing-items', 'flex', 'column');
            gridIng.appendChild(div);

            const h5 = document.createElement('h5');
            h5.textContent = ingredient.ingredient;
            div.appendChild(h5);

            const span2 = document.createElement('span');
            span2.textContent = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
            div.appendChild(span2);
        })

        return card;
    }
}