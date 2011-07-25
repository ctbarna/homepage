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

map.add(po.geoJson()
        .features(city_points['features'])
        .id("cities")
        .on("load", loadCities));


var markets = po.geoJson()
    .url("http://ctbarna.iriscouch.com/farmers_markets/_design/geo/_rewrite/data?bbox="+getBB())
    .on("load", load)
    .id("markets");
map.add(markets);


map.add(po.compass()
    .pan("none"));


function loadCities(e) {
for (var i = 0; i < e.features.length; i++) {
    var feature = e.features[i];
    feature.element.setAttribute("id", "city-"+i);
  }
}

function load (e) {
  function findDistance(city_coords1, market_coords1) {
    var temp_x = city_coords1[0] - market_coords[0],
        temp_y = city_coords1[1] - market_coords[1];
    return Math.sqrt(temp_x * temp_x + temp_y * temp_y);
  }
  var counts = {};

  for (var i = 0; i < e.features.length; i++) {
    var distances = [];
    var market_coords = e.features[i].data.geometry.coordinates;

    for (var j = 0; j < city_points['features'].length; j++) {
      var city_coords = city_points['features'][j]['geometry']['coordinates'];
      distances.push(findDistance(city_coords, market_coords));
    }

    var least_distant = distances.indexOf(Array.min(distances));
    if (least_distant+'' in counts) {
      counts[least_distant+''] = counts[least_distant+'']+1;
    } else {
      counts[least_distant+''] = 1;
    }
  }

  // Figure out the max count.
  var max_array = [];
  for (var key in counts) {
    max_array.push(counts[key]);
  }
  var max = Array.max(max_array);

  var tile = e.tile, g = tile.element;
  while(g.lastChild) g.removeChild(g.lastChild);

  for (var k = 0; k < city_points['features'].length; k++) {
    var city = document.getElementById("city-"+k);

    if (document.getElementById("display-style").selectedIndex == 0) {
      city.setAttribute('r', Math.log((counts[k+'']/max)+1)*125);
    } else {
      city.setAttribute('r', (counts[k+'']/max)*100);
    }
  }
}

function getBB (){
  return map.extent()[0].lon + "," + map.extent()[0].lat + "," + map.extent()[1].lon + "," + map.extent()[1].lat;
}

document.getElementById("display-style").onchange = function (e) {
  markets.reload();
}
