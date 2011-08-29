/* Author: Chris Barna */
$(function () {
  var prevImgIndex = 0, count=0;
      buttons = ["Academic Excellence", "Ideal Location", "Engaged Community", "Jesuit Philosophy"];

  for (var i = 0; i < buttons.length; i += 1) {
    var button = buttons[i].split(" ");
    buttons[i] = button[0] + "<div class=\"second\">"+button[1]+"</div>";
  }

  $.fn.cycle.updateActivePagerLink = function (pager, currImgIndex) {
    $(pager).find("li:eq("+prevImgIndex+") > a").removeClass("down");
    $(pager).find("li:eq("+currImgIndex+") > a").addClass("down");
    prevImgIndex = currImgIndex;
  };

  $("#rotator-images").cycle({
    fx:'fade',
    timeout: 5000,
    pager: '#rotator .buttons',
    pagerAnchorBuilder: function(idx, slide) {
      var extra_class = "";
      if (idx === 0) {
        extra_class = " first";
      } else if (idx === 3) {
        extra_class = " last"
      }
      return "<li class=\"grid_1"+extra_class+"\"><a href=\"#\">"+buttons[idx]+"</a></li>";
    }
  });
});
