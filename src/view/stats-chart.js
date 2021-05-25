import AbstractView from './abstract.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js';

const createStatsChartTemplate = () => {
  return `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;
};

export default class StatsChart extends AbstractView {
  constructor(_genrePopularity) {
    super();
    this._genrePopularity = _genrePopularity;
  }
  getTemplate() {
    return createStatsChartTemplate();
  }

  initChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector('.statistic__chart');

    statisticCtx.height = BAR_HEIGHT * Object.values(this._genrePopularity).length;

    new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: Object.keys(this._genrePopularity),
        datasets: [{
          data: Object.values(this._genrePopularity),
          backgroundColor: '#ffe800',
          hoverBackgroundColor: '#ffe800',
          anchor: 'start',
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: '#ffffff',
            anchor: 'start',
            align: 'start',
            offset: 40,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#ffffff',
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }
}
