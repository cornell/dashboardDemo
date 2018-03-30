import ko from 'knockout';

ko.bindingHandlers.animateValue = {
    init: function (element, valueAccessor) {

        var targetValue = ko.utils.unwrapObservable(valueAccessor());
        element.textContent = 1;
        new NumericTransition(element, targetValue, 300);
    },
    update: function (element, valueAccessor) {

        var targetValue = ko.utils.unwrapObservable(valueAccessor());

        new NumericTransition(element, targetValue, 300);
    }
}

var NumericTransition = function (element, targetValue, duration) {

    var ratio = Math.round(targetValue / 60 * 1.33);
    var refTimeout;
    var tempValue;
    var calculate = function () {
        // debugger;
        var currentValue = parseFloat(element.textContent);
        // debugger;
        // console.log(vmo.age());
        if (currentValue < targetValue) {
            tempValue = parseFloat(element.textContent) + ratio;
            if (tempValue > targetValue) {
                element.textContent = targetValue;
            } else {
                element.textContent = tempValue;
                refTimeout = requestAnimationFrame(calculate);
            }
        } else if (currentValue > targetValue) {
            tempValue = parseFloat(element.textContent) - ratio;
            if (tempValue < targetValue) {
                element.textContent = targetValue;
            } else {
                element.textContent = tempValue;
                refTimeout = requestAnimationFrame(calculate);
            }
        }
        else {
            // debugger;
            // cancelAnimationFrame(refTimeout);
            var t1 = performance.now();
            // debugger;
            console.log('targetValue:[' + targetValue + ']:' + (t1 - t0));
        }
    }
    var t0 = performance.now();
    calculate();
}

