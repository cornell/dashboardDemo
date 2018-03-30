// import $ from 'jquery';

var startUrl = '/Analytics/TrainingDashboard/';

export default {
  getKpis: function(successCallback) {
    return $.getJSON(startUrl + 'GetAllKpis', successCallback);
  },
  updateKpis: function(trainingId, successCallback) {
    $.getJSON(startUrl + 'GetAllKpis/id', { id: trainingId }, successCallback);
  },
  getChart1: function() {
    return $.getJSON(startUrl + 'GetChart/PopularTrainings');
  },
  getChart2: function() {
    return $.getJSON(startUrl + 'GetChart/TimeSpentByTrainings');
  },
  getChart3: function() {
    return $.getJSON(startUrl + 'GetChart/SuccessByTrainings');
  },
  getChart4: function() {
    return $.getJSON(startUrl + 'GetChart/ProgressByTrainings');
  },
};
