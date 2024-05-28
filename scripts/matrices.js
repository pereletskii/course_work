function randWeightenedNetwork(rng) {
    let randR = Math.random();

    let matrix = new Array(7).fill(0).map(() => new Array(7).fill(0));

    for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 7; j++) {
            let key;
            if (`${i}, ${j}` in rng) {
                key = `${i}, ${j}`;
            } else if (`${j}, ${i}` in rng) {
                key = `${j}, ${i}`;
            } else {
                continue;
            }

            let type = rng[key].type;
            let params = rng[key].params;
            if (type == 'normal') {
                matrix[i - 1][j - 1] = params.mu + params.sigma * params.z;
            } else {
                matrix[i - 1][j - 1] = params.a + (params.b - params.a) * randR;
            }
        }
    }

    return matrix
}

module.exports.randWeightenedNetwork = randWeightenedNetwork;