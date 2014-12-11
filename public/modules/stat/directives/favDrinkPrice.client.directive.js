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
    quantity: 3,
    price: 1
  },
  {
    name: 'pineapple',
    quantity: 1,
    price: 2
  },
  {
    name: 'watermelon',
    quantity: 1,
    price: 3
  },
  {
    name: 'pineapple',
    quantity: 1,
    price: 2
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
        title: 'Chart of the repartition of all the money spent',
        tooltips: true,
        labels: true,
        mouseover: function() {},
        mouseout: function() {},
        click: function() {},
        legend: {
          display: true,
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

      //we oughta calculate how much money was spent in each item
      var funds = {};
      $scope.data.forEach(function(val, ind, arr) {
        if(funds[val.name]) {
          funds[val.name] += val.price;
        }
        else {
          funds[val.name] = val.price;
        }
      });
      //then we pass it as data
      for(var fund in funds) {
        this.data.data.push({
          x: fund,
          y: [funds[fund]],
          tooltip: fund
        });
      }

    } // \controller
  };
});