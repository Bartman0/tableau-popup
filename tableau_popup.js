function setup() {
    var selection = chrome.extension.getBackgroundPage().selection;

    console.log("extension tableau popup setup: ", selection);

    if (selection === undefined) return;

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

function initViz(selection) {
    var containerDiv = document.getElementById("vizContainer"),
        baseUrl = "https://hansanders-bi-srv-tst.hosting.inergy.nl/views/Financialweek/Financialweekanalysis";
    var url = baseUrl + "?selection=" + selection;
    var viz = new tableau.Viz(containerDiv, url);

    var notification = new Notification("Tableau link", {
        icon: "icons/icon_48.png",
        body: "Dashboard link for " + selection
    });
    notification.onclick = function() {
        chrome.windows.getCurrent(function(win) {
            console.log("url in notification: " + url);
            chrome.windows.create({
                url: url,
                type: "normal",
                state: "fullscreen"
            });
        });
    };
}

$(window).bind("load", function() {
    console.log("bind load executed in popup");
    setup();
    $(initViz(document.getElementById("selection") && document.getElementById("selection").textContent));
});
