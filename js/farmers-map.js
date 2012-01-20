Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

po = org.polymaps;

var map = po.map()
  .container(document.getElementById("map").appendChild(po.svg("svg")))
  .center({lat:38.229, lon:-95.906})
  .zoom(4.5)
  .add(po.interact())
  .add(po.hash());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
        + "/b60fbbd51f17456794d2b0e4ed4f0d0c"
        + "/998/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""])));

var cities = po.geoJson()
        .features(city_points['features'])
        .id("cities")
        .on("load", loadCities);
map.add(cities);

map.add(po.compass()
    .pan("none"));


function loadCities(e) {
  var counts = farmer_counts;
  var max_array = [];
  for (var key in counts) {
    max_array.push(counts[key]);
  }
  var max = Array.max(max_array);

  // var tile = e.tile, g = tile.element;
  // while(g.lastChild) g.removeChild(g.lastChild);

  for (var i = 0; i < e.features.length; i++) {
    var feature = e.features[i];
    feature.element.setAttribute("id", "city-"+i);

      if (document.getElementById("display-style").selectedIndex == 0) {
        feature.element.setAttribute('r', Math.log((counts[i+'']/max)+1)*125);
      } else {
        feature.element.setAttribute('r', (counts[i+'']/max)*100);
      }
  }
}

function getBB (){
  return map.extent()[0].lon + "," + map.extent()[0].lat + "," + map.extent()[1].lon + "," + map.extent()[1].lat;
}

document.getElementById("display-style").onchange = function (e) {
  cities.reload();
}
