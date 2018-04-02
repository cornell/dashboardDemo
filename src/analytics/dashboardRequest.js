// import $ from 'jquery';

syfadis.analytics.dashboardRequest = {
  startUrl: '/Analytics/TrainingDashboard/',

  getKpis: function(successCallback) {
    return $.getJSON(this.startUrl + 'GetAllKpis', successCallback);
  },
  updateKpis: function(trainingId, successCallback) {
    $.getJSON(this.startUrl + 'GetAllKpis/id', { id: trainingId }, successCallback);
  },
  getChart1: function() {
    return $.getJSON(this.startUrl + 'GetChart/PopularTrainings');
  },
  getChart2: function() {
    return $.getJSON(this.startUrl + 'GetChart/TimeSpentByTrainings');
  },
  getChart3: function() {
    return $.getJSON(this.startUrl + 'GetChart/SuccessByTrainings');
  },
  getChart4: function() {
    return $.getJSON(this.startUrl + 'GetChart/ProgressByTrainings');
  }
};
