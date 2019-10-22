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

  // call Tableau
  var url = tableau.server + "/" + tableau.workbook;

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

  function getImage() {
    jQuery.ajax({
      url: url,
      cache: false,
      withCredentials: true,
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        return xhr;
      },
      success: function(data) {
        var img = document.createElement("img");
        var binaryData = [];
        binaryData.push(data);
        img.src = URL.createObjectURL(
          new Blob(binaryData, { type: "image/png" })
        );
        img.width = 797;
        img.height = 512;

        var canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 600, 400);

        var view = document.getElementById("view");
        var dataurl = canvas.toDataURL("image/png");
        view.src = dataurl;
      },
      error: function(xhr) {
        console.error("error getting image: ", xhr);
      }
    });
  }

  getImage();

  var params = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(params, gotTabs);

  var msg = "msg";
  function gotTabs(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg); //, messageBack);
  }
}

$(window).bind("load", function() {
  console.log("bind load executed in popup");
  setup();
});
