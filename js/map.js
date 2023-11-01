document.addEventListener('DOMContentLoaded', function () {
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hjYXJwZW50aWVyIiwiYSI6ImNrMXQ4dGUzNTBtbWUzZm51OHdmbmt1azcifQ.AbWWx7kFHxTx71GwJToVpA';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',
    center: [6.139747830421155, 48.77641642045436],
    zoom: 18,
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
});

// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);
});

// Create a new marker.
const marker = new mapboxgl.Marker()
    .setLngLat([6.139747830421155, 48.77641642045436])
    .setPopup(new mapboxgl.Popup().setHTML("<p>Adresse : 56 Sq. Eugène Herzog, 54390 Frouard</p><p>Téléphone : 09 72 72 39 36</p>")) // add popup
    .addTo(map);

});