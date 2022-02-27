var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

d3.json(queryUrl).then(function (data) {

    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>${new Date(feature.properties.time)}</p>`);
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {

  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })


  var baseMap = {
    "Street Map": street
  };

  var overlayMap = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
        40.09, -55.71
    ],
    zoom: 2,
    layers: [street, earthquakes]
  });


  L.control.layers(baseMap, overlayMap, {
    collapsed: false
  }).addTo(myMap);

}
