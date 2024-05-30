const express = require("express");
const app = express();

const { staticTablesFormer } = require('./renderHTML.js');


let staticTables = staticTablesFormer();

app.use(express.static("public"));

app.get("/", function(request, response){
    console.log(request.path);

    let dynamicTables = require('./renderHTML.js').dynamicTablesFormer();
    let button = '<button onclick="window.location.reload()">Обновить</button>';

    response.send(staticTables + dynamicTables + button);
});

app.listen(3010);