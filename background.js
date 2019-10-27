console.log("extension background has started");

chrome.runtime.onMessage.addListener(receiver);

var selection;

function receiver(request, sender, sendResponse) {
    console.log("receiver called: ", request.selection);
    selection = request.selection;
}

chrome.runtime.onInstalled.addListener(function() {
    var menuPopup = {
        id: "tableau_popup",
        title: "Popup",
        contexts: ["selection"]
    };

    chrome.contextMenus.create(menuPopup);
    chrome.contextMenus.onClicked.addListener(function(clickData) {
        console.log("context menu popup called");
        if (clickData.menuItemId == "tableau_popup" && clickData.selectionText) {
            console.log("popup called: ", clickData.selectionText);
            chrome.windows.getCurrent(function(win) {
                var width = 700;
                var height = 840;
                var left = screen.width / 2 - width / 2 + win.left;
                var top = screen.height / 2 - height / 2 + win.top;

                chrome.windows.create({
                    url: "tableau_popup.html?selection=" + clickData.selectionText,
                    width: width,
                    height: height,
                    top: Math.round(top),
                    left: Math.round(left),
                    type: "popup"
                });
            });
        }
    });

    var menuTableau = {
        id: "tableau_window",
        title: "Window",
        contexts: ["selection"]
    };

    chrome.contextMenus.create(menuTableau);
    chrome.contextMenus.onClicked.addListener(function(clickData) {
        console.log("context menu window called");
        if (clickData.menuItemId == "tableau_window" && clickData.selectionText) {
            console.log("window called for: ", clickData.selectionText);

            chrome.windows.getCurrent(function(win) {
                chrome.windows.create({
                    url: "tableau_window.html?selection=" + clickData.selectionText,
                    type: "normal",
                    state: "fullscreen"
                });
            });
        }
    });
});
