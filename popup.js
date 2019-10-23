console.log("extension popup has started");

var tableau = {
  server: "https://postnl-image-srv.hosting.inergy.nl/",
  //   server: "https://hansanders-bi-srv-tst.hosting.inergy.nl/",
  login: "rkooijman",
  password: "********",
  workbook: "images/PostNL/Aanverwantelogos_web.png"
  //   workbook: "#/views/SalesweekAudio/Salesweek.png?"
};

function setup() {
  var selection = chrome.extension.getBackgroundPage().selection;

  console.log("extension popup setup: ", selection);

  function gotSelection(data) {
    var p = document.getElementById("selection");
    if (!p) {
      console.error("can not find selection id");
    }
    if (data) {
      p.textContent = data;
    } else {
      p.textContent = "Something went wrong";
    }
  }

  gotSelection(selection);

}

$(window).bind("load", function() {
  console.log("bind load executed in popup");
  setup();
});
