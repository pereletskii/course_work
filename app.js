const express = require("express");
const app = express();

const { staticTablesFormer, dynamicTablesFormer } = require('./renderHTML.js');
const { formHistogram } = require('./scripts/histogram.js');


let staticTables = staticTablesFormer();

app.use(express.static("public"));

app.get("/", function(request, response){
    console.log(request.path);

    let dynamicTables = dynamicTablesFormer();
    let button = '<button onclick="window.location.reload()">Обновить</button>';
    let histogram = formHistogram();

    response.send(staticTables + dynamicTables + button + histogram);
});

app.listen(3010);