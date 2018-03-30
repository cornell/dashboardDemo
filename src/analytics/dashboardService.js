import { KpiList } from './kpis/kpiList';
import graphicCard from './charts/graphicCard';
import request from './dashboardRequest';

export default {
  getKpis: function() {
    return request.getKpis(function(data) {
      var koKpis = new KpiList({ Kpis: data });
      ko.applyBindings(koKpis, document.getElementById('js-kpiContext'));
      window.syfadis.analytics.koKpis = koKpis;
    });
  },
  updateKpis: function(trainingId) {
    if (arguments.length === 0) {
      request.getKpis(function(data) {
        ko.mapping.fromJS({ Kpis: data }, window.syfadis.analytics.koKpis);
      });
    } else {
      request.updateKpis(trainingId, function(data) {
        ko.mapping.fromJS({ Kpis: data }, window.syfadis.analytics.koKpis);
      });
    }
  },
  getChart1: function() {
    return request.getChart1();
  },
  getChart2: function() {
    return request.getChart2();
  },
  getChart3: function() {
    return request.getChart3();
  },
  getChart4: function() {
    return request.getChart4();
  },
};
