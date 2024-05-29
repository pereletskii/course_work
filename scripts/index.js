const fs = require('fs');
const { normalDistribution,  uniformDistribution, normalRng, uniformRng } = require('./distributions');
const { randWeightenedNetwork } = require('./matrices');
const { floydWarshall } = require('./graph');

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

for (const [key, value] of Object.entries(data)) {
    let dataString = []
    for (let i = 0; i < value.length; i++) {
        dataString = dataString.concat(value[i]);
    }
    data[key] = dataString;
}

function findRng(){
    let rng = { normal: [], uniform: [] };
    
    for ([key, value] of Object.entries(data)) {
        rng.normal.push(normalDistribution(data[key], key));
        rng.uniform.push(uniformDistribution(data[key], key));
    }

    return rng;
}

function main(rng) {
    let rngType = {};

    for (let i = 0; i < rng.normal.length; i++) {
        if (rng.normal[i].chi_2_pr > rng.uniform[i].chi_2_pr) {
            rngType[rng.normal[i].path] = {
                type: 'normal',
                params: normalRng(rng.normal[i]),
            }
        } else {
            rngType[rng.uniform[i].path] = {
                type: 'uniform',
                params: uniformRng(rng.uniform[i]),
            }
        }
    }

    let rngMatrix = randWeightenedNetwork(rngType);

    let distancesMatrix = floydWarshall(rngMatrix);

    let radiuses = {};

    for (let i = 0; i < distancesMatrix.length; i++) {
        radiuses[`${i + 1}`] = { outerRadius: 0, innerRadius: 0, innerOuterRadius: 0 };
        radiuses[`${i + 1}`].outerRadius = Math.max.apply(Math, distancesMatrix[i]);
        let col = [];
        for (let j = 0; j < distancesMatrix.length; j++) {
            col.push(distancesMatrix[j][i]);
        }
        radiuses[`${i + 1}`].innerRadius = Math.max.apply(Math, col);
        radiuses[`${i + 1}`].innerOuterRadius = radiuses[`${i + 1}`].innerRadius + radiuses[`${i + 1}`].outerRadius;
    }

    let modelResult = {};
    for ([key, value] of Object.entries(radiuses)) {
        if (modelResult.value){
            if (value.innerOuterRadius < modelResult.value) {
                modelResult.value = value.innerOuterRadius;
                modelResult.vertice = key;
            }
        } else {
            modelResult.value = value.innerOuterRadius;
            modelResult.vertice = key;
        }
    }

    return { rngType, rngMatrix, distancesMatrix, radiuses, modelResult }
}

module.exports.main = main;
module.exports.findRng = findRng;

/* let rng = findRng(data);
console.table(rng.normal);
console.table(rng.uniform);

for ([key, values] of Object.entries(main(rng))) {
    console.table(values);
} */