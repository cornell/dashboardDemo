import service from '../dashboardService';
import Filter from '../Filters/filter';
import chartBuilder from './chartBuilder';

/**
 * Represents a bar chart.
 * @constructor
 * @param {data} data - The data to bind.
 * @param {string} elementId - The id from the element.
 */
export default function(data, title, elementId) {
  var title = title;
  var labels = [];
  var values = [];
  data.Data.forEach(function(item) {
    labels.push(item.Label);
    values.push(item.Data);
  });

  var chart;
  var chartData = {
    data: data.Data,
    labels: labels,
    values: values,
  };

  var el = document.getElementById(elementId);
  var chart = chartBuilder.build(el, data.Type, chartData);
  chartData.el = el;

  return {
    el: el,
    data: data.Data,
    title: title,
    chart: chart,
    chartData: chartData,
  };
}
