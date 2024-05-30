const { main, findRng } = require('./index.js');
function formData() {
  let data = [];
  let rng = findRng();
  
  for (let i = 0; i < 1000; i++) {
    data.push(main(rng).modelResult.vertice);
  }

  return data
}

function formHistogram() {
  let data = formData();

  const counts = {};
  for (const value of data) {
    counts[value] = (counts[value] || 0) + 1;
  }
  const labels = Object.keys(counts);
  const values = Object.values(counts);
  const chartData = { labels, datasets: [{ label: 'Оптимальная точка', data: values, backgroundColor: 'rgba(124, 252, 0, 0.5)' }] };

  const chartConfig = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true } }]
      },
      width: '40%'
    }
  };

  let html = `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>\
  <div styles=""><canvas id="histogramChart"></canvas></div>\
  <script>\
      const ctx = document.getElementById('histogramChart').getContext('2d');\
      new Chart(ctx, ${JSON.stringify(chartConfig)});\
  </script>`;

  return html
}

module.exports.formHistogram = formHistogram;