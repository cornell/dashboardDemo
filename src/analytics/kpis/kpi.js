syfadis.analytics.charts.kpis.Kpi = function(data) {
  var self = this;

  var mapping = {
    copy: ['Title']
  };
  ko.mapping.fromJS(data, mapping, this);
};
