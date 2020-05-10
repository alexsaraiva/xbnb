import EventBus from "../../js/EventBus.js"

class ListItem extends HTMLElement {

    constructor(elm) {
        super();
        this.data = elm;
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="result__imgbox">
                <img src=${this.data.photo} alt=${this.data.name}>
            </div>
            <div class="result__contentbox">
                <h2 class="result__name">${this.data.name}</h2>
                <p class="result__subname">${this.data.property_type}</p>
                <span class="result__price">R$ ${this.data.price}</span>
            </div>
        `
        this.classList.add('result__item');

        this.addEventListener('mouseenter', function () {
            EventBus.fire('itemLocalization', {"localization" : this.data.local})
        })
    }
}

export default ListItem;