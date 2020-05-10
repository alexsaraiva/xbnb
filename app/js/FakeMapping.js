import CONF from "./Config.js";

class FakeMapping {

    constructor(search) {
        this.items = fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72').then(res => res.json());

        this.centerLocal = fetch(`https://api.tomtom.com/search/2/geocode/${search}.json?countrySet=BR&limit=1&key=${CONF.GEOCODERAPI}`)
            .then(res => res.json())
            .then(data => data.results[0]?.position);
    }

    async getItems(qtd) {
        let items = [];

        if(this.centerLocal === undefined) {
            return []
        }

        for (let i = 0; i < qtd; ++i) {
            let item = await this._ramdomItem();
            item.local = await this._ramdomPosition(0.1);
            item.photo = item.photo.replace('xx_large', 'x_medium')
            items.push(item);
        }
        return items;
    }

    _ramdomItem() {
        return this.items.then(item => item[Math.floor(Math.random() * (item.length - 1))]);
    }

    async _ramdomPosition(max) {
        let incremtlat = parseFloat((Math.random() * (max * 2) + (max * -1)).toPrecision(5));
        let incremtlon = parseFloat((Math.random() * (max * 2) + (max * -1)).toPrecision(5));

        let lat = await this.centerLocal.then(l => l.lat) + incremtlat;
        let lon = await this.centerLocal.then(l => l.lon) + incremtlon;

        return {lat, lon}
    }
}

export default FakeMapping;