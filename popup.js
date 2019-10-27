console.log("extension popup has started");

function setup() {
    var selection = chrome.extension.getBackgroundPage().selection;

    console.log("extension popup setup: ", selection);

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

$(window).bind("load", function() {
    console.log("bind load executed in popup");
    setup();
});
