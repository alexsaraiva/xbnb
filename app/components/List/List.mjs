import ListItem from "./ListItem.mjs";
import FakeMapping from "../../js/FakeMapping.js";
import EventBus from "../../js/EventBus.js";

class List extends HTMLElement {

    connectedCallback() {
        this.addEventListener('scroll', function() {
            if (this.scrollTop + this.offsetHeight >  (this.scrollHeight - (this.scrollHeight * 0.1))) {
                this._addItems(4)
            }
        })
    }

    static get observedAttributes() {
        return ['search'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'search' && newValue !== '' && newValue !== oldValue) {
            this.innerHTML = '';

            this.fakeM = new FakeMapping(newValue);

            this.fakeM.centerLocal.then(center => {
                EventBus.fire('targetSearch', {"target" : center})
            })

            this._addItems(10);
        }
    }

    async _addItems(qtd) {
        let items = await this.fakeM.getItems(qtd);

        if(this.childElementCount < 30) {

            EventBus.fire('items', {"items" : items})

            items.forEach((item) => {
                this.appendChild(new ListItem(item));
            })
        }
    }
}

export default List;