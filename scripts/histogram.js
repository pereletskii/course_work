const { main, findRng } = require('./index.js');

let n = 1000;
function formData() {
  let data = new Array(7).fill(0);
  let rng = findRng();
  
  for (let i = 0; i < n; i++) {
    data[main(rng).modelResult.vertice - 1]++;
  }

  return data
}

function formHistogram() {
  let data = formData();
  const chartData = { labels: [1, 2, 3, 4, 5, 6, 7], datasets: [{ label: 'Количество вхождений', data: data, backgroundColor: 'rgba(124, 252, 0, 0.5)', minBarLength: 0 }] };

  const chartConfig = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: [{ ticks: { beginAtZero: true } }]
      }
    }
  };

  let html = `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>\
  <div styles=""><canvas id="histogramChart"></canvas></div>\
  <script>\
      const ctx = document.getElementById('histogramChart').getContext('2d');\
      new Chart(ctx, ${JSON.stringify(chartConfig)});\
  </script>\
  <h2>Количество проверок: ${n}</h2>`;

  return html
}

module.exports.formHistogram = formHistogram;