const Table = require('table-builder');

const { findRng } = require('./scripts/index.js');
const { formatTables } = require('./scripts/tablesHandler.js');

let rng = findRng();

function createTable(headers, data, tableClass='table') {
    return (
        new Table({'class': tableClass})
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

    let out = '<link rel="stylesheet" type="text/css" href="style.css" />' + tableNormal + tableUniform;

    return out
}

let translate = {
    'outerRadius': 'Внешний радиус',
    'innerRadius': 'Внутренний радиус',
    'innerOuterRadius': 'Внешне-внутренний радиус',
    'vertice': 'Вершина',
    'path': 'Путь',
    'mu': 'μ',
    'sigma': 'σ',
}

function dynamicTablesFormer() {
    let data = formatTables(rng);
    let modelResult = data.modelResult;
    delete data.modelResult;
    let out = '';

    for ([tableName, table] of Object.entries(data)) {
        let headers = {};
        for ([header, value] of Object.entries(table[0])) {
            if (translate[header]) {
                headers[header] = translate[header];
            } else {
                headers[header] = header;
            }
        }
        out += createTable(headers, table, 'smallTable');
    }

    let result = `<h2>Подходящая вершина: ${modelResult.vertice}</h2><h2>Внешне-внутренний радиус: ${modelResult.value}</h2>`;

    return out + result
}

module.exports = {
    staticTablesFormer,
    dynamicTablesFormer
}