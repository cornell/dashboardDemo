var $success = '#1FB15E';
var $failed = '#F47B2A';
var $undefined = '#36B9CB';

var configChart1 = {
    type: 'horizontalBar',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            type: 'horizontalBar',
            label: 'échec',
            backgroundColor: $failed,
            data: [-17, -31, -33, -32, -37, -32, -17]
        },{
            type: 'horizontalBar',
            label: 'indéterminé',
            backgroundColor: $undefined,
            data: [22, 21, 22, 28, 27, 33, 55]
        },{
            type: 'horizontalBar',
            label: 'succès',
            backgroundColor: $success,
            data: [61, 47, 44, 41, 36, 35, 28],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
            // Overrides the global setting
            mode: 'index'
        },
        events: ['click'],
        legend: { display: true },
        tooltips: { "enabled": false },
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                categoryPercentage: 1,
                stacked: true,
                display: false,
                gridLines: { display: true },
                ticks: { beginAtZero: true }
            }],
            yAxes: [{
                stacked: true,
                display: true,
                gridLines: { display: false },
            }]
        }
    }
};

var ctx = document.getElementById("myChart1").getContext("2d");
var chart = new Chart(ctx, configChart1);

var densityData = {
    label: 'Density of Planet (kg/m3)',
    data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638],
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
    borderColor: 'rgba(0, 99, 132, 1)',
    yAxisID: "y-axis-density"
  };
   
  var gravityData = {
    label: 'Gravity of Planet (m/s2)',
    data: [3.7, 8.9, 9.8, 3.7, 23.1, 9.0, 8.7, 11.0],
    backgroundColor: 'rgba(99, 132, 0, 0.6)',
    borderColor: 'rgba(99, 132, 0, 1)',
    yAxisID: "y-axis-gravity"
  };
   
  var planetData = {
    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    datasets: [densityData, gravityData]
  };
   
  var chartOptions = {
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        id: "y-axis-density"
      }, {
        id: "y-axis-gravity"
      }]
    }
  };
   
ctx = document.getElementById("myChart2").getContext("2d");
var barChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: planetData,
    options: chartOptions
});

