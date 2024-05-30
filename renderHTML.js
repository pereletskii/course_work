const Table = require('table-builder');
const fs = require('fs');

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

    let out = '<link rel="stylesheet" type="text/css" href="style.css" />'
        +'<h2 class="tableName">Хи-квадрат для нормального закона распределения</h2>'
        +tableNormal
        +'<h2 class="tableName">Хи-квадрат для равномерного закона распределения</h2>'
        +tableUniform;

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
    'normalTable': 'Параметры генератора случайных чисел для нормального закона распределения',
    'uniformTable': 'Параметры генератора случайных чисел для равномерного закона распределения',
    'rngMatrix': 'Случайная взвешенная сеть',
    'distancesMatrix': 'Матрица расстояний',
    'radiuses': 'Радиусы'
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
        let name = `<h2 class="tableName">${translate[tableName]}</h2>`;
        out += name + createTable(headers, table, 'smallTable');
    }

    let result = `<h2>Подходящая точка: ${modelResult.vertice}</h2><h2>Внешне-внутренний радиус: ${modelResult.value}</h2>`;

    return out + result
}

function inputDataFormer() {
    let rawData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

    let data = []
    let headers = {'path': 'Путь'}
    let times = ['9:00', '12:00', '15:00', '18:00', '21:00'];
    for (let i = 0; i < times.length * 5; i++) {
        headers[`_${i}`] = times[i % 5];
    }

    for ([edge, matrix] of Object.entries(rawData)) {
        let dataString = {};
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                dataString[`_${j * 5 + i}`] = matrix[i][j];
            }
        }
        dataString['path'] = edge;

        data.push(dataString);
    }

    return '<h2>Исходные данные</h2>' + createTable(headers, data)
}

module.exports = {
    staticTablesFormer,
    dynamicTablesFormer,
    inputDataFormer
}