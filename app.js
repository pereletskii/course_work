const express = require("express");
const app = express();

const { staticTablesFormer, dynamicTablesFormer, inputDataFormer } = require('./renderHTML.js');
const { formHistogram } = require('./scripts/histogram.js');

let map = 
'<div class="wrapper">\
    <div id="map"><h2>Карта района Бирюлёво западное</h2><img src="map.png" alt="map"/></div>\
    <div id="graph"><h2>Граф района</h2><img src="graph.png" alt="graph"/></div>\
</div>';
let inputData = inputDataFormer();
let staticTables = staticTablesFormer();

app.use(express.static("public"));

app.get("/", function(request, response){
    console.log(request.path);

    let dynamicTables = dynamicTablesFormer();
    let button = '<button onclick="window.location.reload()">Обновить</button>';
    let histogram = formHistogram();

    response.send(map + inputData + staticTables + dynamicTables + button + histogram);
});

app.listen(3010);