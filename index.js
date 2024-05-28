const fs = require('fs');
const { normalDistribution,  uniformDistribution, normalRng, uniformRng } = require('./scripts/distributions');
const { randWeightenedNetwork } = require('./scripts/matrices');

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

for (const [key, value] of Object.entries(data)) {
    let dataString = []
    for (let i = 0; i < value.length; i++) {
        dataString = dataString.concat(value[i]);
    }
    data[key] = dataString;
}

function main() {
    let rng = { normal: [], uniform: [] };
    let rngType = {};

    for ([key, value] of Object.entries(data)) {
        rng.normal.push(normalDistribution(data[key], key));
        rng.uniform.push(uniformDistribution(data[key], key));
    }
    // console.log(rng);

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
    // console.log(rngType);

    let matrix = randWeightenedNetwork(rngType);
    console.table(matrix);
}

module.exports.main = main;

main();