'use strict';

var acData = {
  series: ["Sales"],
  data: [
    {
      x: "Printers",
      y: [60],
      tooltip: "This is a tooltip"
    },
    {
      x: "Computers",
      y: [40],
      tooltip: "This is a tooltip"
    }]
};

var sampleData = [
  {
    name: 'banana',
    quantity: 3
  },
  {
    name: 'pineapple',
    quantity: 1
  },
  {
    name: 'watermelon',
    quantity: 1
  }
];


angular.module('stat')
.directive('favDrinkPrice', function() {
  return {
    templateUrl: 'modules/stat/directives/fav-drink-price.html',
    scope: {
      data: '=data'
    },
    controllerAs: 'fdp',
    controller: function($scope) {

      /*
       * FOR TEST PURPOSES
       */

      $scope.data = sampleData;

      this.config = {
        title: 'Chart of the most purchased items',
        tooltips: true,
        labels: true,
        mouseover: function() {},
        mouseout: function() {},
        click: function() {},
        legend: {
          display: false,
          position: 'right',
          htmlEnabled: false
        },
        colors: [],
        innerRadius: 0, // Only on pie Charts
        lineLegend: 'lineEnd', // Only on line Charts
        lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
        isAnimate: true, // run animations while rendering chart
        yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
        xAxisMaxTicks: 7 // Optional: maximum number of X axis ticks to show if data points exceed this number
      };

      this.data = {
        series: ['Purchases'],
        data: []
      };

      //we oughta calculate the quantity of every purchase
      var quantities = {};
      $scope.data.forEach(function(val, ind, arr) {
        if(quantities[val.name]) {
          quantities[val.name] += val.quantity;
        }
        else {
          quantities[val.name] = val.quantity;
        }
      });
      //then we pass it as data
      for(var quantity in quantities) {
        this.data.data.push({
          x: quantity,
          y: [quantities[quantity]],
          tooltip: quantity
        });
      }

    } // \controller
  };
});