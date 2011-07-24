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
    .url("http://ctbarna.iriscouch.com/farmers_markets/_design/geo/_rewrite/data?bbox="+getBB())
    .on("load", load)
    .id("markets"));

map.add(po.compass()
    .pan("none"));

function load (e) {
  var cluster = e.tile.cluster || (e.tile.cluster = kmeans()
      .iterations(16)
      .size(64));

  for (var i = 0; i < e.features.length; i++) {
    cluster.add(e.features[i].data.geometry.coordinates);
  }

  var tile = e.tile, g = tile.element;
  while (g.lastChild) g.removeChild(g.lastChild);

  var means = cluster.means();
  means.sort(function(a, b) { return b.size - a.size; });
  for (var i = 0; i < means.length; i++) {
    var mean = means[i], point = g.appendChild(po.svg("circle"));
    point.setAttribute("cx", mean.x);
    point.setAttribute("cy", mean.y);
    point.setAttribute("r", Math.pow(2, tile.zoom - 11) * Math.sqrt(mean.size) * 100);
  }
}

function getBB (){
  return map.extent()[0].lon + "," + map.extent()[0].lat + "," + map.extent()[1].lon + "," + map.extent()[1].lat;
}

