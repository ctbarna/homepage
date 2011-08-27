(function() {
  var data = [], workingData = [],
      selectors = document.getElementsByClassName('selector'),
      selectorVals = {},
      selected = {};

  // Put all the selectors into an object.
  for (var i = 0; i < selectors.length; i+=1) {
    selectorVals[selectors[i].id] = selectors[i].getElementsByTagName('a');
    selected[selectors[i].id] = [];
  }

  // Filter onclick.
  var filter = function () {
    var grandparentID = this.parentNode.parentNode.id,
        text = this.textContent || this.innerText;

    if (this.className.match(/\bselected\b/)) {
      var index = selected[grandparentID].indexOf(text);
      selected[grandparentID].splice(index, 1);
      this.className = this.className.replace(/\bselected\b/, '');
    } else {
      selected[grandparentID].push(text);
      this.className += " selected";
    }

    // Set up the data.
    workingData = data.filter(function(d) {
      var signature = 1, desired = 1, count = 0;

      for (var prop in selected) {
        // Increase the count.
        count += 1;

        // Bitshift them.
        signature = signature<<1;
        desired = desired<<1;

        // Assign a desired score.
        if (selected[prop].length > 0) {
          desired = ~desired;
        }

        // Loop through and score things.
        for (var i = 0; i < selected[prop].length; i += 1) {
          if (selected[prop][i] === d[prop]) {
            signature = ~signature;
          }
        }
      }

      if ((signature === desired) && (desired !== 1<<count)) {
        return true;
      } else {
        return false;
      }
    });

    generateChart();

    return false;
  };

  for (var prop in selectorVals) {
    for (var i = 0; i < selectorVals[prop].length; i+=1) {
      selectorVals[prop][i].onclick = filter;
    }
  }

  // Load data.
  d3.json("../src/fdny.json", function(json) {
    data = json;
  });

  var h = 300,
      w = 960;

  var chart = d3.select("#chart")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h);


  var generateChart = function () {
    workingData = workingData.filter(function(d) { if (d.YEARMONTH !== "FyTotal") return true; })
    var wdMax = workingData.reduce( function (a,b) { return Math.max(a, b.INCIDENTCOUNT )}, 0),
      barWidth = w / workingData.length,
      y = d3.scale.linear()
        .domain([0, wdMax])
        .range([0, 300]),
      barHeight = function (d) { return y(d.INCIDENTCOUNT); };

    var bars = chart.selectAll('rect')
      .data(workingData, function(d) { return d.INCIDENTCOUNT; })

    bars.exit().transition()
      .duration(1000)
      .attr("y", h)
      .attr("width", 0)
      .attr("height", 0)
      .remove();

    bars.enter().append("svg:rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("y", h);
    bars.transition()
      .duration(1000)
      .ease("linear", "out")
      .attr("x", function (d, i) { return i * barWidth; })
      .attr("y", function (d) { return h - barHeight(d); })
      .attr("height", barHeight)
      .attr("width", barWidth);

      };

})();
