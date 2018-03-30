export default function(ctx, chartData) {
  var $success = '#1FB15E';
  var $failed = '#F47B2A';
  var $undefined = '#36B9CB';

  var colors = [];
  var barColors = [];
  var activeBarColor = 'rgba(54,185,203, 1)';
  var inactiveBarColor = 'rgba(54,185,203, .5)';

  var values = {
    succeeded: [],
    failed: [],
    unknown: [],
  };
  //   debugger;
  chartData.values.forEach(function(data) {
    values.succeeded.push(data[0]);
    values.failed.push(-data[1]);
    values.unknown.push(data[2]);
  });

  (function initBarColors() {
    for (var i = 0; i < chartData.values.length; i++) {
      colors.push('rgba(60,134,182, 1)');
    }
  })();

  function activateBar(currentIndex) {
    for (var i = 0; i < barColors.length; i++) {
      if (i === currentIndex) {
        barColors[i] = activeBarColor;
      } else {
        barColors[i] = inactiveBarColor;
      }
    }
  }

  function activateAllBars() {
    for (var i = 0; i < barColors.length; i++) {
      barColors[i] = activeBarColor;
    }
  }

  function getElement(evt) {
    var elements = chart.getElementsAtEvent(evt);
    var result;
    if (elements && elements.length > 0) {
      result = elements[0];
    }
    return result;
  }

  function update() {
    chart.update();
  }

  function reset() {
    log.info(chartData.el.id + ' reseted');
    activateAllBars();
    chart.update();
  }

  function truncateLabels(labels) {
    var result = [labels.length];
    for (var i = 0; i < labels.length; i++) {
      result[i] = labels[i].substring(0, 35) + ' ...';
    }
    return result;
  }

  function selectBar(id) {
    var items = chartData.data;
    var index;
    for (var i = 0; i < items.length; i++) {
      if (items[i].Id === id) {
        index = i;
        break;
      }
    }
    if (typeof index !== 'undefined') {
      log.info(chartData.el.id + ' select bar [' + index + ']');
      activateBar(index);
      update();
    }
  }

  var chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          type: 'horizontalBar',
          label: 'échec',
          backgroundColor: $failed,
          data: values.failed,
        },
        {
          type: 'horizontalBar',
          label: 'indéterminé',
          backgroundColor: $undefined,
          data: values.unknown,
        },
        {
          type: 'horizontalBar',
          label: 'succès',
          backgroundColor: $success,
          data: values.succeeded,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        // Overrides the global setting
        mode: 'index',
      },
      events: ['click'],
      legend: { display: true },
      tooltips: { enabled: false },
      scales: {
        xAxes: [
          {
            stacked: true,
            display: false,
            gridLines: { display: true },
            ticks: { beginAtZero: true },
          },
        ],
        yAxes: [
          {
            stacked: true,
            display: true,
            gridLines: { display: false },
          },
        ],
      },
      plugins: {
        datalabels: {
          color: 'white',
          display: function(context) {
            return context.dataset.data[context.dataIndex] + '%';
          },
          font: {
            // weight: 'bold'
          },
          formatter: Math.round,
        },
      },
    },
  });

  return {
    chart: chart,
    update: update,
    activateBar: activateBar,
    activateAllBars: activateAllBars,
    reset: reset,
    getElement: getElement,
    selectBar: selectBar,
  };
}
