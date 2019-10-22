$(function() {
    chrome.storage.sync.get("customer_code_regex", function(data) {
        $("#customer_code_regex").val(data.customer_code_regex);
    });
    chrome.storage.sync.get("tableau_server", function(data) {
        $("#tableau_server").val(data.tableau_server);
    });

    $("#save").click(function() {
        var customer_code_regex = $("#customer_code_regex").val();
        if (customer_code_regex) {
            chrome.storage.sync.set({ customer_code_regex: customer_code_regex }, function() {});
        }
        var tableau_server = $("#tableau_server").val();
        if (tableau_server) {
            chrome.storage.sync.set({ tableau_server: tableau_server }, function() {
                close();
            });
        }
    });
});
