const express = require("express");
const app = express();

const { main, findRng } = require('./scripts/index.js');

function html() {
    // TODO сделать генерацию html страницы
}

app.get("/", function(request, response){
    console.log(request.path);
    response.send(html());
});

app.listen(3010);