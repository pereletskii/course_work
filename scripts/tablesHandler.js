const { main } = require('./index.js');

function JSONify(table){
    let JSONrngMatrix = {}
    for (let i = 0; i < table.length; i++) {
        table[i] = [i + 1].concat(table[i]);
        JSONrngMatrix[i + 1] = table[i];
    }
    return JSONrngMatrix
}

function formatTables(rng) {
    let data = main(rng);
    // console.log(data);

    // console.log(data.rngType);
    data['normalTables'] = {};
    data['uniformTables'] = {};
    for ([key, value] of Object.entries(data.rngType)) {
        if (value.type == 'normal') {
            data.normalTables[key] = value.params;
        } else {
            data.uniformTables[key] = value.params;
        }
    }
    delete data['rngType'];
    // console.log(data.normalTables);
    // console.log(data.uniformTables);
    // OK

    // console.log(data.rngMatrix);
    for (let i = 0; i < data.rngMatrix.length; i++) {
        for (let j = 0; j < data.rngMatrix.length; j++) {
            if (data.rngMatrix[i][j] == Infinity){
                data.rngMatrix[i][j] = 0;
            }
            data.rngMatrix[j][i] = data.rngMatrix[i][j]
        }   
    }
    // console.table(data.rngMatrix);

    data.rngMatrix = JSONify(data.rngMatrix);
    // console.table(data.rngMatrix);
    // OK

    // console.table(data.distancesMatrix);
    data.distancesMatrix = JSONify(data.distancesMatrix);
    // console.table(data.distancesMatrix);
    // OK

    // console.table(data.radiuses);
    // OK

    // console.table(data.modelResult);
    // OK

    return data
}

module.exports.formatTables = formatTables;