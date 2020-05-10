import GoogleMapsApi from "../../js/GoogleMapsApi.mjs";
import CONF from "../../js/Config.js";
import EventBus from "../../js/EventBus.js";

class Map extends HTMLElement {

     connectedCallback() {
        this.innerHTML = '<div id="map" style="height: 100%"></div>';

        this.gmap = new GoogleMapsApi(CONF.MAPAPI);
        this.gmap.renderMap("#map", {
            center: {lat: -13, lng: -49},
            zoom: 5,
            scrollwheel: false
        });

         EventBus.register('itemLocalization', (evt) => {
             let {lat, lon} = evt.detail.localization;
             this.gmap.setZoom(12);
             this.gmap.setCenter(lat, lon);
         });

         EventBus.register('items', (evt) => {
             evt.detail.items.forEach((item) => {
                 let {lat, lon} = item.local;
                 this.gmap.renderMaker(lat, lon);
             })
         })

         EventBus.register('targetSearch', (evt) => {
             let {lat, lon} = evt.detail.target;
             this.gmap.setZoom(12);
             this.gmap.setCenter(lat, lon);
         });
     }
}

export default Map;