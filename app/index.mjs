import List from "./components/List/List.mjs";
import ListItem from "./components/List/ListItem.mjs";
import Map from "./components/Map/Map.mjs";

window.addEventListener('DOMContentLoaded', () => {
    customElements.define('g-list', List);
    customElements.define('g-list-item', ListItem);
    customElements.define('g-maps', Map);


    document.querySelector(".search").addEventListener("submit", function(e) {
        e.preventDefault();
        let result__list = document.querySelector('.result__list');
        result__list.setAttribute("search", this.loc.value);
    })
});


