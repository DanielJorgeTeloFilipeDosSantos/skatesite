const $mapContainer = document.getElementById('map');

let map;

function init() {
  map = new google.maps.Map($mapContainer, {
    center: { lat: 39, lng: -9.75 },
    zoom: 8
  });
  // Call other callbacks that should
  // only run after Google Maps has been initiated
  setThingsOnMap();
}

const stores = [
  { lat: 39.1, lng: -9.545 },
  { lat: 34.1, lng: -9.565 },
  { lat: 36.1, lng: -9.455 },
  { lat: 41.1, lng: -9.565 },
  { lat: 34.1, lng: -9.355 },
];

function setThingsOnMap() {
  for (let store of stores) {
    var marker = new google.maps.Marker({
      position: store,
      map: map
    });

    marker.addListener('click', function() {
      console.log('Clicked store at ' + store.lat + ' ' + store.lng);
    });
  }
}
