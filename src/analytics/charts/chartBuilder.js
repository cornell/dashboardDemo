import createBarChart from './components/barChart';
import createStackChart from './components/stackChart';

export default {
  Bar: createBarChart,
  Stack: createStackChart,

  build: function(el, chartType, data) {
    var chart = this[chartType];

    if (chart) {
      return chart(el, data);
    } else {
      log.error('the chart ' + chartType + ' is not implemented !');
    }
  },
};
