var MALE_BAR_COLOUR = 'rgba(0, 51, 78, 0.3)';
var MALE_BAR_ACTIVE_COLOUR = 'rgba(0, 51, 78, 1)';
var FEMALE_BAR_COLOUR = 'rgba(248, 142, 40, 0.3)';
var FEMALE_BAR_ACTIVE_COLOUR = 'rgba(248, 142, 40, 1)';
debugger;
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      label: 'Male',
      data: [0, 0, 0, 0, 0],
      backgroundColor: MALE_BAR_COLOUR
    }, {
      label: 'Female',
      data: [0, 0, 0, 0, 0],
      backgroundColor: FEMALE_BAR_COLOUR
    }]
  },
  options: {
    legend: {
      labels: {
        generateLabels: function(chart) {
          labels = Chart.defaults.global.legend.labels.generateLabels(chart);
          labels[0].fillStyle = MALE_BAR_ACTIVE_COLOUR;
          labels[1].fillStyle = FEMALE_BAR_ACTIVE_COLOUR;
          return labels;
        }
      }
    }
  }
});