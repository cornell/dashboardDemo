import './koplugins/animateValue';

var dashboardMockService = syfadis.analytics.dashboardMockService;
var dashboardService = syfadis.analytics.dashboardService;
var graphicCardService = syfadis.analytics.charts.graphicCardService;

var filters = new syfadis.analytics.charts.filters.FilterList();
var graphicCards = [];
var synchronizeCharts;

// ---------------this.---------------------------------------------------
// todo: export to literal object ou constructor function
// ------------------------------------------------------------------

dashboardService.getKpis();
var promiseChart1 = dashboardService.getChart1();
var promiseChart2 = dashboardService.getChart2();
var promiseChart3 = dashboardService.getChart3();
var promiseChart4 = dashboardService.getChart4();

var promises = [promiseChart1, promiseChart2, promiseChart3, promiseChart4];

filters.isEmpty.subscribe(function(value, event) {
  if (value === false) return;

  // log.info('filters empty');
  // // resetCharts(graphicCards);
  // log.info(graphicCard.el.id + ' reseted');
  // graphicCard.chart.reset();
  dashboardService.updateKpis();
});

/**/
for (var i = 0; i < promises.length; i++) {
  var promise = promises[i];

  promise
    .then(function() {
      log.log('yo je créé les charts !!!');
      //   debugger;
      var graphicCard = graphicCardService.createGraphicCard(arguments[0]);
      graphicCards.push(graphicCard);

      filters.isEmpty.subscribe(function(value, event) {
        if (value === false) return;
        // resetCharts(graphicCards);
        graphicCard.chart.reset();
        // service.updateKpis();
      });

      filters.hasTraining.subscribe(function(value, event) {
        if (value === false) return;

        // synchronizeCharts();
        var filter = filters.getTraining();
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
          if (filters.hasTraining() === false) {
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
              if (filters.isEmpty()) {
                // debugger;
                var myFilter = new syfadis.analytics.charts.Filter(
                  'training',
                  graphicCard.title,
                  currentBar.Id,
                  currentBar.Label
                );
                filters.addFilter(myFilter);
              } else {
                var trainingFilter = filters.getTraining();
                trainingFilter.id(currentBar.Id);
                trainingFilter.value(currentBar.Label);
                synchronizeCharts();
              }
              // chart.update();

              dashboardService.updateKpis(currentBar.Id);
            } else {
              // reset
              // debugger;
              oldCurrentIndex = -1;
              // chart.reset();
              filters.removeTrainingFilter();
            }
          }
        });
      }
    });
}

ko.applyBindings({ model: filters }, document.getElementById('js-filterContext'));
