syfadis.analytics.charts.graphicCardService = {
  createGraphicCard: function(data) {
    var result = syfadis.analytics.charts.graphicCard(data, 'Formation', 'myChart' + data.Location);
    var el = document.getElementById('js-graphicCard-'.concat(data.Location));
    ko.applyBindings(data.Title, el);
    return result;
  },

  resetCharts: function(graphicCards) {
    graphicCards.map(function(graphicCard) {
      // debugger;
      log.info(graphicCard.el.id + ' reseted');
      graphicCard.chart.reset();
    });
  },

  synchronizeCharts: function() {
    log.info('training filter added');
    var filter = myFilters.getTraining();
    // updateCharts(graphicCards);
    for (var i = 0; i < graphicCards.length; i++) {
      graphicCards[i].chart.selectBar(filter.id());
    }
  }
};
