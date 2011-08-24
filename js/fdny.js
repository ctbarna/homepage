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

    if (this.className.match(/\bselected\b/)) {
      var index = selected[grandparentID].indexOf(this.innerText);
      selected[grandparentID].splice(index, 1);
      this.className = this.className.replace(/\bselected\b/, '');
    } else {
      selected[grandparentID].push(this.innerText);
      this.className += " selected";
    }

    // Set up the data.
    workingData = data.filter(function(d) {
      var score = 0, count = 0;

      for (var prop in selected) {
        // Assign a desired score.
        if (selected[prop].length > 0) {
          count += 1;
        }

        // Loop through and score things.
        for (var i = 0; i < selected[prop].length; i += 1) {
          if (selected[prop][i] === d[prop]) {
            score += 1;
          }
        }
      }

      if ((score === count) && (score !== 0)) {
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
