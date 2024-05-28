const fs = require('fs');
const { chiSquarePValue } = require('./scripts/chi_square');

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

for (const [key, value] of Object.entries(data)) {
    let dataString = []
    for (let i = 0; i < value.length; i++) {
        dataString = dataString.concat(value[i]);
    }
    data[key] = dataString;
}

function sum(arr){
    return arr.reduce((total, current) => total + current, 0);
}

function standartDeviation(mu, data) {
    let variance = [];

    for (let i = 0; i < data.length; i++) {
        variance[i] = Math.pow(data[i] - mu, 2);
    }

    let standard_deviation = Math.pow(sum(variance) / variance.length, 0.5);

    return standard_deviation
}

function normalDistributionLaw(data){
    let hi = {
        mu: 0,
        sigma: 0,
        mu_minus_sigma: 0,
        mu_plus_sigma: 0,
        o1: 0,
        o2: 0,
        o3: 0,
        o4: 0,
        e1: 0,
        e2: 0,
        e3: 0,
        e4: 0,
        chi_2: 0,
        chi_2_pr: 0,
    }

    hi.mu = sum(data) / data.length;
    hi.sigma = standartDeviation(hi.mu, data);
    hi.mu_minus_sigma = hi.mu - hi.sigma;
    hi.mu_plus_sigma = hi.mu + hi.sigma;

    for (let i = 0; i < data.length; i++) {
        if (data[i] <= hi.mu_minus_sigma) {
            hi.o1++;
        } else if (data[i] > hi.mu_minus_sigma && data[i] <= hi.mu) {
            hi.o2++;
        } else if (data[i] > hi.mu && data[i] <= hi.mu_plus_sigma) {
            hi.o3++;
        } else if (data[i] > hi.mu_plus_sigma) {
            hi.o4++;
        }
    }

    hi.e1 = 0.16 * data.length;
    hi.e2 = 0.34 * data.length;
    hi.e3 = hi.e2;
    hi.e4 = hi.e1;
    hi.chi_2 = (hi.o1 - hi.e1) ** 2 / hi.e1 + (hi.o2 - hi.e2) ** 2 / hi.e2 + (hi.o3 - hi.e3) ** 2 / hi.e3 + (hi.o4 - hi.e4) ** 2 / hi.e4;

    

    hi.chi_2_pr = chiSquarePValue(hi.chi_2, 1);

    return hi
}

function main(){
    let out = []
    for ([key, value] of Object.entries(data)) {
        out.push(normalDistributionLaw(data[key]).chi_2_pr);
    }
    console.log(out);
}

module.exports.main = main;

main();