console.log("extension content has started");

document.addEventListener("mouseup", sendSelection);

function sendSelection(event) {
  console.log("get selection");
  var selection = window.getSelection().toString();

  if (selection.length > 0) {
    console.log("send selection");
    chrome.runtime.sendMessage({ selection: selection });
  }
}

$(window).bind("load", function() {
  console.log("bind load executed");
});
