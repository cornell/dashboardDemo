import { Kpi } from './kpi';

var KpiList = function(data) {
  var mapping = {
    // 'nom': {
    //     create: function (options) {
    //         return options.data.toUpperCase();
    //     }
    // },
    Kpis: {
      key: function(data) {
        return ko.utils.unwrapObservable(data.Id);
      },
      create: function(options) {
        return new Kpi(options.data);
      },
    },
  };
  ko.mapping.fromJS(data, mapping, this);
};

export { KpiList };
