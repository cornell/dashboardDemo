var myChart;
var vm;
var filterMapped = false;
var filter;

var NumericTransition = function (element, targetValue, duration) {
    var ratio = 1;
    if (targetValue > 60) {
        ratio = Math.round(targetValue / 60 * 1.33);
    }
    var refTimeout;
    var tempValue;
    var calculate = function () {

        var currentValue = parseFloat(element.textContent);
        if (currentValue < targetValue) {
            tempValue = currentValue + ratio;
            if (tempValue > targetValue) {
                element.textContent = targetValue.replace('.', ',');
            } else {
                element.textContent = tempValue;
                refTimeout = requestAnimationFrame(calculate);
            }
        } else if (currentValue > targetValue) {
            tempValue = currentValue - ratio;
            if (tempValue < targetValue) {
                element.textContent = targetValue.replace('.', ',');
            } else {
                element.textContent = tempValue;
                refTimeout = requestAnimationFrame(calculate);
            }
        }
        else {
            // cancelAnimationFrame(refTimeout);
            //var t1 = performance.now();
            //console.log('targetValue:[' + targetValue + ']:' + (t1 - t0));
        }
    }
    //var t0 = performance.now();
    if (parseFloat(targetValue) < 1) {
        element.textContent = targetValue.replace('.', ',');
    } else {
        element.textContent = 1;
        calculate();
    }
}

ko.bindingHandlers.animateValue = {
    init: function (element, valueAccessor) {

        var targetValue = ko.utils.unwrapObservable(valueAccessor());
        //debugger;
        //element.textContent = 1;
        element.setAttribute('data-value', targetValue);
        new NumericTransition(element, targetValue, 300);
    },
    update: function (element, valueAccessor) {

        var targetValue = ko.utils.unwrapObservable(valueAccessor());
        new NumericTransition(element, targetValue, 300);
    }
}

var KpiList = function (data) {
    var mapping = {
        // 'nom': {
        //     create: function (options) {
        //         return options.data.toUpperCase();
        //     }
        // },
        'Kpis': {
            key: function (data) {
                return ko.utils.unwrapObservable(data.Id);
            },
            create: function (options) {
                return new Kpi(options.data);
            }
        }
    };
    ko.mapping.fromJS(data, mapping, this);

}

var Kpi = function (data) {
    var self = this;

    var mapping = {
        //key: function (data) {
        //    return ko.utils.unwrapObservable(data.Id);
        //},
        'copy': ['Title']
    }
    // debugger;
    ko.mapping.fromJS(data, mapping, this);

    // this.nomComplet = ko.computed(function () {
    //     return this.prenom + ' ' + this.nom;
    // }, this);
}

$.getJSON("GetKpis", function (data) {

    var kpis = new KpiList(data);
    vm = kpis;
    ko.applyBindings(kpis, document.getElementById('js-kpiContext'));
    //vm = ko.mapping.fromJS(data, mapping);
    //ko.applyBindings(vm, document.getElementById('js-kpiContext'));
})

$.getJSON("GetCharts", function (data) {

    ko.applyBindings(data, document.getElementById('js-chartContext'));

    var chart = data.Charts[0];
    var labels = truncateLabels(chart.Data.map(d => d.Label));
    var values = chart.Data.map(d => d.Value);

    function truncateLabels(labels) {

        var result = [labels.length];
        for (var i = 0; i < labels.length; i++) {
            result[i] = labels[i].substring(0, 25) + (' ...');
        }
        return result;
    }

    var chartData = {
        labels: labels,
        values: values
    };

    var ctx = document.getElementById("myChart");
    myChart = getChart(ctx, chartData);

    ctx.onclick = function (evt) {

        var elements = myChart.getElementsAtEvent(evt);
        var element = elements[0];
        if (element) {
            var data = element['_chart'].config.data;
            var index = element['_index'];
            var label = data.labels[index];
            var value = data.datasets[0].data[index];
            //debugger;
            var id = chart.Data[index].Id;
            var elGraphTitle = document.querySelector('.GraphicCard-title');
            var title = ko.dataFor(elGraphTitle).Title;
            //debugger;            
            //var vm = ko.mapping.fromJS(filter, {});
            if (!filterMapped) {

                filter = {
                    id: index,
                    title: title,
                    value: ko.observable(label),
                };
                ko.applyBindings(filter, document.getElementById('js-filterContext'));
                filterMapped = true;
            } else {
                filter.value(label);
            }

            //console.log(chart.Data);
            //console.log(id);

            $.getJSON("GetKpis", { id: id }, function (data) {

                debugger;
                //var kpis = new KpiList(data);
                ko.mapping.fromJS(data, vm);
            })
        }
    };

    var btnRemoveFilter = document.querySelector('#removeFilter');
    btnRemoveFilter.addEventListener('click', function (e) {

        $('#FilterRemove').addClass('is-hide');
    });

    var graphics = document.querySelectorAll('.GraphicCard');
    var graph1 = graphics[0];
    var graph2 = graphics[1];
    var graph3 = graphics[2];
    var graph4 = graphics[3];
    var graph5 = graphics[4];
    var graph6 = graphics[5];

    //var btn = document.querySelector('.GraphicCard-1');
    //btn.addEventListener('click', function (e) {
    //    $($(graph1)).toggleClass('is-expanded');
    //});

    var elIconExpand = document.querySelector('.GraphicCard-iconExpand');
    elIconExpand.addEventListener('click', function (e) {

        if ($(graph1).hasClass('is-expanded2')) {

            $(this).next().next().removeClass('is-expanded');
            $($(graph1)).toggleClass('is-expanded2');

            var to = setTimeout(function () {
                $($(graph1)).toggleClass('is-expanded');
            }, 300);

        } else {

            $($(graph1)).toggleClass('is-expanded');
            $(this).next().next().addClass('is-expanded');

            var to = setTimeout(function () {
                $($(graph1)).toggleClass('is-expanded2');
            }, 20);

        }
    });


})

var getChart = function (ctx, chartData) {

    return new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.values,
                datalabels: {
                    anchor: 'end',
                    align: 'end'
                },
                backgroundColor: ['rgba(162,162,162, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            hover: {
                // Overrides the global setting
                mode: 'index'
            },
            events: ['click'],
            legend: { display: false },
            tooltips: { "enabled": false },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: { display: false },
                    ticks: { beginAtZero: true }
                }],
                yAxes: [{
                    gridLines: { display: false }
                }]
            }
        }
    });
}


//var kpis = [{
//    title: 'inscrits',
//    value: '971'
//}, {
//    title: 'formations',
//    value: '17531',
//    unit: 'H'
//}, {
//    title: 'succès',
//    value: '72',
//    unit: '%'
//}, {
//    title: 'progression',
//    value: '49',
//    unit: '%'
//}, {
//    title: 'formations<br />terminées',
//    value: '21',
//    unit: '%'
//}, {
//    title: 'formations<br />par apprenant',
//    value: '1,7'
//}, {
//    title: 'formations<br />par apprenant',
//    value: '23'
//}];

//var charts = [{
//    title: 'Formations les plus suivies',
//    datas: [{
//        title: 'Fintech, la Révolution des Moyens de Paiement',
//        value: 127
//    }, {
//        title: "Circuits Bancaires et Moyens de Paiement à l'International",
//        value: 108
//    }, {
//        title: 'La Maîtrise du Recouvrement Contentieux',
//        value: 96
//    }, {
//        title: 'La Gestion du Risque Opérationnel Inhérent aux Activités Bancaires',
//        value: 90
//    }, {
//        title: 'Principes et Spécificités de la Comptabilité Bancaire',
//        value: 81
//    }, {
//        title: 'Lutte contre le Blanchiment des Capitaux et contre le Terrorisme : Risques de Non-conformité et Risques Opérationnels',
//        value: 63
//    }, {
//        title: "Les Contrats d'Assurance de Dommages",
//        value: 54
//    }, {
//        title: 'Initiation aux Marchés Boursiers',
//        value: 45
//    }]
//}, {
//    title: "Nb d'heures",
//    datas: [{
//        title: 'Lutte contre le Blanchiment des Capitaux et contre le Terrorisme : Risques de Non-conformité et Risques Opérationnels',
//        value: 381
//    }, {
//        title: 'La Gestion du Risque Opérationnel Inhérent aux Activités Bancaires',
//        value: 304
//    }, {
//        title: "Circuits Bancaires et Moyens de Paiement à l'International",
//        value: 268
//    }, {
//        title: 'La Maîtrise du Recouvrement Contentieux',
//        value: 250
//    }, {
//        title: 'Principes et Spécificités de la Comptabilité Bancaire',
//        value: 213
//    }, {
//        title: 'Fintech, la Révolution des Moyens de Paiement',
//        value: 169
//    }, {
//        title: 'Initiation aux Marchés Boursiers',
//        value: 142
//    }, {
//        title: "Les Contrats d'Assurance de Dommages",
//        value: 115
//    }]
//}, {
//    title: 'Taux de succès'
//}, {
//    title: 'Taux de progression'
//}, {
//    title: 'Progression des formations'
//}, {
//    title: 'Origine des inscriptions'
//}
//];