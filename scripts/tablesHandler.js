const { main, findRng } = require('./index.js');

function JSONify(table){
    let JSONrngMatrix = []
    for (let i = 0; i < table.length; i++) {
        let string = {};
        string[0] = i + 1;
        for (let j = 0; j < table[i].length; j++) {
            string[j + 1] = table[i][j];
        }
        JSONrngMatrix.push(string);
    }
    return JSONrngMatrix
}

function formatTables(rng) {
    // All data
    let data = main(rng);

    // rngType
    data['normalTable'] = [];
    data['uniformTable'] = [];
    for ([key, value] of Object.entries(data.rngType)) {
        if (value.type == 'normal') {
            data.normalTable.push({
                path: key,
                mu: value.params.mu,
                sigma: value.params.sigma,
                z: value.params.z
            })
        } else {
            data.uniformTable.push({
                path: key,
                a: value.params.a,
                b: value.params.b
            })
        }
    }
    delete data['rngType'];

    // rngMatrix
    for (let i = 0; i < data.rngMatrix.length; i++) {
        for (let j = 0; j < data.rngMatrix.length; j++) {
            if (data.rngMatrix[i][j] == Infinity){
                data.rngMatrix[i][j] = 0;
            }
            data.rngMatrix[j][i] = data.rngMatrix[i][j]
        }   
    }
    data.rngMatrix = JSONify(data.rngMatrix);

    // distancesMatrix
    data.distancesMatrix = JSONify(data.distancesMatrix);

    // radiuses
    let radiuses = [];
    for ([key, table] of Object.entries(data.radiuses)) {
        let string = {};
        string['vertice'] = key;
        for ([strName, value] of Object.entries(table)) {
            string[strName] = value;
        }
        radiuses.push(string);
    }
    data.radiuses = radiuses;

    // modelResult without changes

    return data
}

module.exports.formatTables = formatTables;

// console.log(formatTables(findRng()))