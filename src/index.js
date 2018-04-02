import './koplugins/animateValue';

import './analytics/dashboardMockService';
import service from './analytics/dashboardService';

var myFilters = new syfadis.analytics.charts.filters.FilterList();
var graphicCards = [];
var synchronizeCharts;

// ------------------------------------------------------------------
// todo: export to literal object ou constructor function
// ------------------------------------------------------------------

var createGraphicCard = function(data) {
  var result = syfadis.analytics.charts.graphicCard(data, 'Formation', 'myChart' + data.Location);
  var el = document.getElementById('js-graphicCard-'.concat(data.Location));
  ko.applyBindings(data.Title, el);
  return result;
};

var resetCharts = function(graphicCards) {
  graphicCards.map(function(graphicCard) {
    // debugger;
    log.info(graphicCard.el.id + ' reseted');
    graphicCard.chart.reset();
  });
};

var synchronizeCharts = function() {
  log.info('training filter added');
  var filter = myFilters.getTraining();
  // updateCharts(graphicCards);
  for (var i = 0; i < graphicCards.length; i++) {
    graphicCards[i].chart.selectBar(filter.id());
  }
};
// ------------------------------------------------------------------

service.getKpis();
var promiseChart1 = service.getChart1();
var promiseChart2 = service.getChart2();
var promiseChart3 = service.getChart3();
var promiseChart4 = service.getChart4();

var promises = [promiseChart1, promiseChart2, promiseChart3, promiseChart4];

myFilters.isEmpty.subscribe(function(value, event) {
  if (value === false) return;

  // log.info('filters empty');
  // // resetCharts(graphicCards);
  // log.info(graphicCard.el.id + ' reseted');
  // graphicCard.chart.reset();
  service.updateKpis();
});

/**/
for (var i = 0; i < promises.length; i++) {
  var promise = promises[i];

  promise
    .then(function() {
      log.log('yo je créé les charts !!!');
      //   debugger;
      var graphicCard = createGraphicCard(arguments[0]);
      graphicCards.push(graphicCard);

      myFilters.isEmpty.subscribe(function(value, event) {
        if (value === false) return;
        // resetCharts(graphicCards);
        graphicCard.chart.reset();
        // service.updateKpis();
      });

      myFilters.hasTraining.subscribe(function(value, event) {
        if (value === false) return;

        // synchronizeCharts();
        var filter = myFilters.getTraining();
        graphicCard.chart.selectBar(filter.id());
      });
      return graphicCard;
    })
    .done(function() {
      // log.log(arguments[0]);
      addClickToChart(arguments[0]);

      function addClickToChart(graphicCard) {
        var el = graphicCard.el;
        var chart = graphicCard.chart;
        var oldCurrentIndex = -1;
        var currentIndex;
        el.addEventListener('click', function(evt) {
          // debugger;
          if (myFilters.hasTraining() === false) {
            oldCurrentIndex = -1;
          }
          var element = chart.getElement(evt);

          if (element) {
            currentIndex = element._index;
            var currentBar = graphicCard.data[currentIndex];
            // debugger;
            // change
            if (oldCurrentIndex != currentIndex) {
              // chart.activateBar(currentIndex);
              oldCurrentIndex = currentIndex;
              if (myFilters.isEmpty()) {
                // debugger;
                var myFilter = new syfadis.analytics.charts.Filter(
                  'training',
                  graphicCard.title,
                  currentBar.Id,
                  currentBar.Label
                );
                myFilters.addFilter(myFilter);
              } else {
                var trainingFilter = myFilters.getTraining();
                trainingFilter.id(currentBar.Id);
                trainingFilter.value(currentBar.Label);
                synchronizeCharts();
              }
              // chart.update();

              service.updateKpis(currentBar.Id);
            } else {
              // reset
              // debugger;
              oldCurrentIndex = -1;
              // chart.reset();
              myFilters.removeTrainingFilter();
            }
          }
        });
      }
    });
}

ko.applyBindings({ model: myFilters }, document.getElementById('js-filterContext'));
