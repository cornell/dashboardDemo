ko.components.register('analytics-filter', {
    viewModel: function(params) {
        // debugger;
        return params.model;
    },
    template:
        '<!-- ko foreach: filters -->\
        <div id="FilterRemove" class="Filter">\
            <div class="Filter-bodyContainer">\
                <div class="Filter-title" data-bind="text: title"></div>\
                <div class="Filter-value" data-bind="text: value"></div>\
            </div>\
            <div id="removeFilter" class="Filter-removeContainer">\
                <div class="Filter-remove syficon icon-cancel" data-bind="click: $parent.removeFilter"></div>\
            </div>\
        </div>\
        <!-- /ko -->'
});
