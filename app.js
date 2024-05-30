const express = require("express");
const app = express();
const Table = require('table-builder');

const { findRng } = require('./scripts/index.js');
const { formatTables } = require('./scripts/tablesHandler.js');

function createTable(headers, data) {
    return (
        new Table({'class': 'table'})
            .setHeaders(headers)
            .setData(data)
            .render()
    )
}

function staticTablesFormer() {
    let headersUniform = {'path': 'Путь', 'mu': 'μ', 'sigma': 'σ', 'a': 'a', 'b': 'b', 'o1': 'o1', 'o2': 'o2', 'o3': 'o3', 'o4': 'o4', 'e1': 'e1', 'e2': 'e2', 'e3': 'e3', 'e4': 'e4', 'chi_2': 'χ²', 'chi_2_pr': 'χ²*'};
    var tableUniform = createTable(headersUniform, rng.uniform);

    let headersNormal = {'path': 'Путь', 'mu': 'μ', 'sigma': 'σ', 'mu_minus_sigma': 'μ-σ', 'mu_plus_sigma': 'μ+σ', 'o1': 'o1', 'o2': 'o2', 'o3': 'o3', 'o4': 'o4', 'e1': 'e1', 'e2': 'e2', 'e3': 'e3', 'e4': 'e4', 'chi_2': 'χ²', 'chi_2_pr': 'χ²*'}
    var tableNormal = createTable(headersNormal, rng.normal);

    let out = '<link rel="stylesheet" type="text/css" href="style.css" />' + tableNormal + tableUniform + '<button onclick="window.location.reload()">Обновить</button>';

    return out
}

function dynamicTablesFormer() {
    let data = formatTables(rng)

    for ([key, value] of Object.entries(data)) {
        // TODO сделать формирование динамических таблиц в HTML
    }
}

let rng = findRng();
let staticTables = staticTablesFormer();

app.use(express.static("public"));

app.get("/", function(request, response){
    console.log(request.path);

    let dynamicTables = dynamicTablesFormer(rng);

    response.send(staticTables + dynamicTables);
});

app.listen(3010);