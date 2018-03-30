// import $ from 'jquery';
require('jquery-mockjax')($, window);

$.mockjaxSettings.responseTime = 0;
// $.mockjaxSettings.logging = 1;

var startUrl = '/Analytics/TrainingDashboard/';

$.mockjax({
  url: startUrl + 'GetAllKpis/id',
  data: { id: 1 },
  proxy: '../data/kpis-bar1.json',
});

$.mockjax({
  url: startUrl + 'GetAllKpis/id',
  data: { id: 2 },
  proxy: '../data/kpis-bar2.json',
});

$.mockjax({
  url: startUrl + 'GetAllKpis',
  proxy: '../data/kpis.json',
});

$.mockjax({
  url: startUrl + 'GetChart/PopularTrainings',
  proxy: '../data/chart-1.json',
  responseTime: 300,
});

$.mockjax({
  url: startUrl + 'GetChart/TimeSpentByTrainings',
  proxy: '../data/chart-2.json',
  responseTime: 1200,
});

$.mockjax({
  url: startUrl + 'GetChart/SuccessByTrainings',
  proxy: '../data/chart-3.json',
  responseTime: 1000,
});

$.mockjax({
  url: startUrl + 'GetChart/ProgressByTrainings',
  proxy: '../data/chart-4.json',
});
/*
$.mockjax({
    url: 'GetCharts',
    proxy: '../data/charts.json'
})

*/
