    var po = org.polymaps;
    var locations = [
      {name: "Music and Dance Facility", loc: { lat: 37.35020175896629, lon: -121.94256598783728 }},
      {name: "Louis B. Mayer Theater", loc: { lat: 37.34968199774784, lon: -121.94263863594345 }},
      {name: "O'Connor Hall", loc: { lat: 37.34993400363648, lon: -121.94161495808378 }},
      {name: "Alumni Science Hall", loc: { lat: 37.35077926721084, lon: -121.94105358635427 }},
      {name: "Physics Building", loc: { lat: 37.35030151070774, lon: -121.94129794816594 }},
      {name: "Edward J. Daly Science", loc: { lat: 37.350417012558566, lon: -121.94090829014193 }},
      {name: "Chemistry Building", loc: { lat: 37.35054301437502, lon: -121.94050542337135 }},
      {name: "Lucas Hall", loc: { lat: 37.35109951986799, lon: -121.93971289857677 }},
      {name: "Arts and Sciences Building", loc: { lat: 37.35048526356873, lon: -121.93935626241921 }},
      {name: "De Saisset Museum", loc: { lat: 37.349949753976404, lon: -121.94063090646384 }},
      {name: "Nobili Hall", loc: { lat: 37.34895747610608, lon: -121.94238106538518 }},
      {name: "Mission Santa Clara De Asis", loc: { lat: 37.349246235569396, lon: -121.941529101231 }},
      {name: "Adobe Lodge", loc: { lat: 37.348610963284074, lon: -121.94185271552212 }},
      {name: "St. Joseph's Hall", loc: { lat: 37.348820971245885, lon: -121.94096112512821 }},
      {name: "Walsh Administartion Building", loc: { lat: 37.34938798980858, lon: -121.94028087467953 }},
      {name: "Bergin Law Library", loc: { lat: 37.34897322665083, lon: -121.93958081111097 }},
      {name: "Future Site of Enrollment Management", loc: { lat: 37.34980275067494, lon: -121.93899962626162 }},
      {name: "Bannan Hall", loc: { lat: 37.349508743208645, lon: -121.93863638573076 }},
      {name: "Kenna Hall", loc: { lat: 37.34842720583556, lon: -121.9399638647617 }},
      {name: "Varsi Hall", loc: { lat: 37.34818044512582, lon: -121.94154230997758 }},
      {name: "Ricard Observatory", loc: { lat: 37.34788118104919, lon: -121.94107339947413 }},
      {name: "Donohue Alumni House", loc: { lat: 37.348164694414635, lon: -121.94062430209054 }},
      {name: "Bannan Engineering Laboratories", loc: { lat: 37.3490047277305, lon: -121.93866940759722 }},
      {name: "Bannan Engineering Building", loc: { lat: 37.34919898409672, lon: -121.93814766210745 }},
      {name: "Mechanical Engineering", loc: { lat: 37.34873696813153, lon: -121.93816087085403 }},
      {name: "Harrington Learning Commons and Library", loc: { lat: 37.34827494932317, lon: -121.93794292653551 }},
      {name: "Walsh Residence Hall", loc: { lat: 37.3473929055214, lon: -121.9413111569125 }},
      {name: "McLaughlin Residence Hall", loc: { lat: 37.3475819157798, lon: -121.94065071958369 }},
      {name: "Kennedy Mall", loc: { lat: 37.34719864448219, lon: -121.94082243328917 }},
      {name: "Dunne Residence Hall", loc: { lat: 37.34681012089598, lon: -121.94107339947412 }},
      {name: "Swig Residence Hall", loc: { lat: 37.34706738673876, lon: -121.94029408342612 }},
      {name: "Benson Memorial Center", loc: { lat: 37.34762391799485, lon: -121.93937607553906 }},
      {name: "Campus Bookstore", loc: { lat: 37.3477341736975, lon: -121.93882791255614 }},
      {name: "Malley Fitness and Recreation Center", loc: { lat: 37.34860046287052, lon: -121.93678716121006 }},
      {name: "Sullivan Aquatic Center", loc: { lat: 37.34887872333236, lon: -121.93596821892233 }},
      {name: "Leavey Events Center", loc: { lat: 37.34913598208715, lon: -121.93523513348732 }},
      {name: "Locatelli Student Center", loc: { lat: 37.34980800079781, lon: -121.93542666031269 }},
      {name: "Graham Residence Halls", loc: { lat: 37.347361403765404, lon: -121.93735513731286 }},
      {name: "Campisi Residence Hall", loc: { lat: 37.34785492975756, lon: -121.93666167811759 }},
      {name: "Sanfilippo Residence Hall", loc: { lat: 37.34760291689031, lon: -121.9361531413744 }},
      {name: "Cowell Health Center", loc: { lat: 37.348180445125806, lon: -121.93568423087093 }},
      {name: "Fine Arts Building", loc: { lat: 37.346699863836434, lon: -121.93681357870324 }},
      {name: "Sobrato Residence Hall", loc: { lat: 37.346762867890305, lon: -121.93602765828194 }},
      {name: "Casa Italiana Residence Hall", loc: { lat: 37.34695713005698, lon: -121.93520871599421 }},
      {name: "Facilities Building", loc: { lat: 37.346295586566015, lon: -121.9346011136517 }},
      {name: "Buck Shaw Stadium", loc: { lat: 37.35055351451679, lon: -121.93659563438472 }},
      {name: "Loyola Hall", loc: { lat: 37.345812551129114, lon: -121.93324061275429 }}
      ];

    $(function() {
      document.getElementById("map").onclick = function(e) {
        var loc = map.pointLocation(map.mouse(e));
        $("#locs").html("{ lat: "+ loc.lat + ", lon: "+loc.lon+" }")
      };

      $.each(locations, function (index, value) {
        $("#chooser").append("<option value=\""+escape(JSON.stringify(value.loc))+"\">"+value.name+"</option>");
      });

      $("#chooser").change(function() {
        animateCenterZoom(map, JSON.parse(unescape($(this).val())), 18.3);
      });

      var map = po.map()
        .container(document.getElementById("map").appendChild(po.svg("svg")))
        .zoom(16.5)
        .zoomRange([16, 20])
        .center({lat: 37.34851, lon: -121.93808})
        .add(po.interact())
        .add(po.hash());

      map.add(po.image()
        .url(po.url("http://{S}tile.cloudmade.com"
        + "/efa54718b7204ca69d8649022c843ff7" // http://cloudmade.com/register
        + "/3121/256/{Z}/{X}/{Y}.png")
        .hosts(["a.", "b.", "c.", ""]))
        .zoom(function(z) { return Math.min(z, 18); }));

      map.add(po.image()
        .url("http://cms.scu.edu/docs/gmaps/get_tile.cfm?zoom={Z}&coords=({X}, {Y})")
        .zoom(function(z) { return Math.max(17, Math.min(20, z)); }));

      $("#benson").click(function () {
        animateCenterZoom(map, {lat: 37.34765, lon: -121.93928}, 18.3);
      });
    });
