//Chart.defaults.global.defaultFontColor = 'gray';
export default function(ctx, chartData) {
  var colors = [];
  var barColors = [];
  var activeBarColor = 'rgba(54,185,203, 1)';
  var inactiveBarColor = 'rgba(54,185,203, .5)';

  (function initBarColors() {
    for (var i = 0; i < chartData.values.length; i++) {
      colors.push(activeBarColor);
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

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    //     hover: {
    //         // Overrides the global setting
    //         mode: 'index'
    //     },
    events: ['click', 'hover'],
    onHover: function() {},
    onClick: function() {},
    legend: { display: false },
    tooltips: {
      enabled: false,
      mode: 'index',
      // axis: 'y'
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: { display: false },
          ticks: { beginAtZero: true },
        },
      ],
      yAxes: [
        {
          display: true, // show labels,
          scaleLabel: {
            fontColor: 'FF0000',
            padding: 20,
          },
          gridLines: { display: false },
          ticks: { beginAtZero: true },
        },
      ],
    },
  };
  // debugger;
  var chart = new Chart(ctx, {
    // fontColor: 'yellow',
    type: 'horizontalBar',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.values,
          datalabels: {
            anchor: 'end',
            align: 'end',
          },
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    },
    options: options,
  });
  // debugger;
  barColors = chart.data.datasets[0].backgroundColor;

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

// var MALE_BAR_COLOUR = 'rgba(0, 51, 78, 0.3)';
// var MALE_BAR_ACTIVE_COLOUR = 'rgba(0, 51, 78, 1)';
// var FEMALE_BAR_COLOUR = 'rgba(248, 142, 40, 0.3)';
// var FEMALE_BAR_ACTIVE_COLOUR = 'rgba(248, 142, 40, 1)';
// debugger;
// var ctx = document.getElementById("myChart");

/*
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['titi', 'toto'],
    datasets: [{
      label: 'Male',
      data: [5, 10, 20, 30, 40],
      backgroundColor: MALE_BAR_COLOUR
    }, {
      label: 'Female',
      data: [10, 18, 23, 32, 35],
      backgroundColor: FEMALE_BAR_COLOUR
    }]
  },
  options: {
    legend: {
      labels: {
        generateLabels: function(chart) {
            // debugger;
          var labels = Chart.defaults.global.legend.labels.generateLabels(chart);
          labels[0].fillStyle = MALE_BAR_ACTIVE_COLOUR;
          labels[1].fillStyle = FEMALE_BAR_ACTIVE_COLOUR;
          return labels;
        }
      }
    }
  }
});
*/
