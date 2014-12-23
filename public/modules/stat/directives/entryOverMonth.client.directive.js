'use strict';

/*
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
*/
var sampleData = [
  {
    name: 'banana',
    quantity: 3,
    price: 1,
    time: 1336736
  },
  {
    name: 'pineapple',
    quantity: 1,
    price: 2,
    time: 32273
  },
  {
    name: 'watermelon',
    quantity: 1,
    price: 3,
    time: 179999
  },
  {
    name: 'pineapple',
    quantity: 1,
    price: 2,
    time: 3029833
  }
];


angular.module('stat')
.directive('entryOverMonth', function() {
  return {
    templateUrl: 'modules/stat/directives/entry-over-month.html',
    scope: {
      data: '=data'
    },
    controllerAs: 'eom',
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
        series: ['Money'],
        data: []
      };

      //we oughta calculate how much money was spent each month
      var spent = {};
      $scope.data.forEach(function(val, ind, arr) {
        var date = new Date(val.time);
        //TODO: study Date object to make the spent object
        if(spent[val.name]) {
          spent[val.name] += val.price;
        }
        else {
          spent[val.name] = val.price;
        }
      });
      //then we pass it as data
      for(var money in spent) {
        this.data.data.push({
          x: money,
          y: [spent[money]],
          tooltip: money
        });
      }

    } // \controller
  };
});