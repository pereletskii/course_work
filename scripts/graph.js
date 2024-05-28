function floydWarshall(graph) {
    const n = graph.length;
    const dist = Array.from(Array(n), () => Array(n).fill(Infinity));

    // Инициализация матрицы расстояний
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (graph[i][j] !== undefined) {
                dist[i][j] = graph[i][j];
            }
        }
    }

    // Алгоритм Флойда-Уоршелла
    for (let k = 0; k < n; ++k) {
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            dist[j][i] = dist[i][j];
        }
    }

    return dist; // Возвращает матрицу расстояний
}

module.exports.floydWarshall = floydWarshall;
