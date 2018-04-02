// import { KpiList } from './kpis/kpiList';
// import graphicCard from './charts/graphicCard';
// import request from './dashboardRequest';

syfadis.analytics.dashboardService = {
  request: syfadis.analytics.dashboardRequest,
  getKpis: function() {
    return this.request.getKpis(function(data) {
      var koKpis = new syfadis.analytics.charts.kpis.KpiList({ Kpis: data });
      ko.applyBindings(koKpis, document.getElementById('js-kpiContext'));
      window.syfadis.analytics.koKpis = koKpis;
      log.info('dashboardService.getKpis');
    });
  },
  updateKpis: function(trainingId) {
    log.info('dashboardService.updateKpis');
    if (arguments.length === 0) {
      this.request.getKpis(function(data) {
        ko.mapping.fromJS({ Kpis: data }, window.syfadis.analytics.koKpis);
      });
    } else {
      this.request.updateKpis(trainingId, function(data) {
        ko.mapping.fromJS({ Kpis: data }, window.syfadis.analytics.koKpis);
      });
    }
  },
  getChart1: function() {
    return this.request.getChart1();
  },
  getChart2: function() {
    return this.request.getChart2();
  },
  getChart3: function() {
    return this.request.getChart3();
  },
  getChart4: function() {
    return this.request.getChart4();
  }
};
