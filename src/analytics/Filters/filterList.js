syfadis.analytics.charts.filters.FilterList = function() {
  // debugger;
  var self = this;
  self.nom = ko.observable();
  self.filters = ko.observableArray([]);
  self.isEmpty = ko.observable(true);
  self.hasTraining = ko.observable(false);

  self.addFilter = function(filter) {
    self.filters.push(filter);
    self.isEmpty(false);
    if (filter.reference === 'training') {
      log.info('training filter added');
      self.hasTraining(true);
    }
  };

  self.removeFilter = function(filter, event) {
    // if (event && event.originalEvent) { //user changed
    self.filters.remove(filter);
    if (self.filters().length == 0) {
      log.info('training filter added');
      self.isEmpty(true);
    }
    self.hasTraining(false);
  };

  self.removeTrainingFilter = function() {
    if (self.filters() && self.filters().length > 0) {
      self.removeFilter(self.filters()[0]);
    }
  };

  self.getTraining = function() {
    var result;
    if (self.hasTraining()) {
      return self.filters()[0];
    }
    return result;
  };
};
