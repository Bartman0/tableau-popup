function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
        url = "https://hansanders-bi-srv-tst.hosting.inergy.nl/views/Financialweek/Financialweekanalysis";

    var viz = new tableau.Viz(containerDiv, url);
}

$(initViz);
