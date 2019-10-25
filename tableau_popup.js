chrome.runtime.onMessage.addListener(receiver);

var selection = 12345678;

function receiver(request, sender, sendResponse) {
    console.log("receiver called: ", request.selection);
    selection = request.selection;
}

function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
        url = "https://hansanders-bi-srv-tst.hosting.inergy.nl/views/Financialweek/Financialweekanalysis";

    var viz = new tableau.Viz(containerDiv, url);

    var notification = new Notification("Tableau link", {
        icon: "icons/icon_48.png",
        body: "Dashboard link for " + selection
    });
    notification.onclick = function() {
        window.open(
            // "https://hansanders-bi-srv-tst.hosting.inergy.nl/views/Financialweek/Financialweekanalysis?Store+id=" + selection
            "https://hansanders-bi-srv-tst.hosting.inergy.nl/views/Financialweek/Financialweekanalysis"
        );
    };
}

$(initViz);
