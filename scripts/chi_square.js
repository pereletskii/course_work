const PI = Math.PI;

function gammaFunction(z) {
    if (z < 0.5) {
        return PI / (Math.sin(PI * z) * gammaFunction(1 - z));
    }

    z -= 1;
    let x = 0.99999999999980993;
    const coefficients = [
        676.5203681218851, -1259.1392167224028, 771.32342877765313,
        -176.61502916214059, 12.507343278686905, -0.13857109526572012,
        9.9843695780195716e-6, 1.5056327351493116e-7
    ];

    for (let i = 0; i < coefficients.length; i++) {
        x += coefficients[i] / (z + i + 1);
    }

    let t = z + coefficients.length - 0.5;
    return Math.sqrt(2 * PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function incompleteGamma(s, x, epsilon = 0.01) {
    function integrand(t) {
        return Math.pow(t, s - 1) * Math.exp(-t);
    }

    let result = 0;
    let step = epsilon;
    let t = 0;
    while (t <= x) {
        let num = integrand(t) * step;
        if (num == Infinity) {
            num = 0;
        }

        result += num;
        t += step;
    }

    return result;
}

function chiSquareCDF(x, k) {
    let s = k / 2.0;
    let gammaS = gammaFunction(s);
    let gammaIncomplete = incompleteGamma(s, x / 2.0);
    return gammaIncomplete / gammaS;
}

function chiSquarePValue(x, k) {
    let cdf = chiSquareCDF(x, k);
    return 1 - cdf;
}

module.exports.chiSquarePValue = chiSquarePValue;