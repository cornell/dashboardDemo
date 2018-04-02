// import createBarChart from "./components/barChart";
// import createStackChart from "./components/stackChart";

syfadis.analytics.charts.chartBuilder = {
  Bar: syfadis.analytics.charts.components.barChart,
  Stack: syfadis.analytics.charts.components.stackChart,

  build: function(el, chartType, data) {
    var chart = this[chartType];

    if (chart) {
      return chart(el, data);
    } else {
      log.error('the chart ' + chartType + ' is not implemented !');
    }
  }
};
