export default class GoogleMapsApi {
    constructor(api) {
        this.apiKey = api;

        if (!window._GoogleMapsApi) {
            this.callbackName = '_GoogleMapsApi.mapLoaded';
            window._GoogleMapsApi = this;
            window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
        }
    }

    load() {
        if (!this.promise) {
            this.promise = new Promise(resolve => {
                this.resolve = resolve;
                if (typeof window.google === 'undefined') {
                    const script = document.createElement('script');
                    script.src = `//maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
                    script.async = true;
                    document.body.append(script);
                } else {
                    this.resolve();
                }
            });
        }

        return this.promise;
    }

    mapLoaded() {
        if (this.resolve) {
            this.resolve();
        }
    }

    renderMap(elm, options) {
        this.load().then(() =>
            this.map = new google.maps.Map(document.querySelector(elm), options)
        )
    }

    renderMaker(lat, lng) {
       this.markers = this.load().then(() => new google.maps.Marker({
           position: {lat, lng},
           map: this.map
       }))
    }

    setZoom(zoom) {
        this.load().then(() => this.map.setZoom(zoom));
    }

    setCenter(lat, lng) {
        this.load().then(() => this.map.panTo({lat, lng}));
    }
}

