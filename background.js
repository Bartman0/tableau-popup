console.log("extension background has started");

chrome.runtime.onMessage.addListener(receiver);

var selection;

function receiver(request, sender, sendResponse) {
    console.log("receiver called: ", request.selection);
    selection = request.selection;
}

chrome.runtime.onInstalled.addListener(function() {
    var menuItem = {
        id: "tableau_link",
        title: "Tableau link",
        contexts: ["selection"]
    };

    chrome.contextMenus.create(menuItem);
    chrome.contextMenus.onClicked.addListener(function(clickData) {
        if (clickData.menuItemId == "tableau_link" && clickData.selectionText) {
            console.log("menu called: ", clickData.selectionText);
            chrome.windows.getCurrent(function(win) {
                var width = 700;
                var height = 840;
                var left = screen.width / 2 - width / 2 + win.left;
                var top = screen.height / 2 - height / 2 + win.top;

                chrome.windows.create({
                    url: "tableau_popup.html",
                    width: width,
                    height: height,
                    top: Math.round(top),
                    left: Math.round(left),
                    type: "popup"
                });
            });
        }
    });
});
