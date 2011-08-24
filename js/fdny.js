(function() {
  var data, workingData,
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
    var grandparentID = this.parentNode.parentNode.id;

    if (this.getAttribute("class") === "selected") {
      var index = selected[grandparentID].indexOf(this.innerText);
      selected[grandparentID].splice(index, 1);
      this.setAttribute("class", null);
    } else {
      selected[grandparentID].push(this.innerText);
      this.setAttribute("class", "selected");
    }

    // Set up the data.
    workingData = data.filter(function(d) {
      var score = 0, count = 0;

      for (var prop in selected) {
        if (selected[prop].length > 0) {
          count += 1;
        }

        for (var i = 0; i < selected[prop].length; i += 1) {
          if (selected[prop][i] === d[prop]) {
            score += 1;
          }
        }
      }

      if (score == count) {
        return true;
      } else {
        return false;
      }
      });

    document.getElementById("selection").innerText = JSON.stringify(workingData);
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

})();
/* $(document).ready(function() {
  var srcData, showData, types, boroughs;
  // Load the data.
  $.getJSON('../src/fdny.json', function(data) {
    srcData = data;
  });

  // Update the selection
  var updateSelection = function () {
    var typesElements = $("#types .selected"),
      boroughsElements = $("#boroughs .selected");

    types = [];
    boroughs = [];

    typesElements.each(function() {
      types.push($(this).text());
    });

    boroughsElements.each(function() {
      boroughs.push($(this).text());
    });

    buildShowData();
  };

  // Set up the array that contains the filtered data.
  var buildShowData = function () {
    var tempData = [];
    showData = [];

    // Iterate through the types.
    for (var i = 0; i < srcData.length; i+=1) {
      for (var j = 0; j < types.length; j+=1) {
        if (srcData[i].INCIDENTCLASSIFICATION === types[j]) {
          tempData.push(srcData[i]);
        }
      }
    }

    // Iterate through the boroughs.
    for (var i = 0; i < tempData.length; i+=1) {
      for (var j = 0; j < boroughs.length; j+=1) {
        if (tempData[i].INCIDENTBOROUGH == boroughs[j]) {
          showData.push(tempData[i]);
        }
      }
    }

    displayData();
  };

  var displayData = function () {
  }

  // Toggle the selections.
  $(".selector a").click(function(e) {
    $(this).toggleClass("selected");
    updateSelection();
    return false;
  });
}); */
