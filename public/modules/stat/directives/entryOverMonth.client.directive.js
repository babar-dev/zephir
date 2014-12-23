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
    controllerAs: 'eom',
    controller: function($scope) {

      this.config = {
        title: 'Chart of the money spent each month (in €)',
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

      $scope.stat.data.deposits.then(function(promised) {

        //we oughta calculate how much money was spent each month
        var spent = {};
        promised.forEach(function(val, ind, arr) {
          var date = new Date(parseInt(val.date, 10));
          var datestring = '';
          switch(date.getMonth()) {
            case 0: datestring += 'January'; break;
            case 1: datestring += 'February'; break;
            case 2: datestring += 'March'; break;
            case 3: datestring += 'April'; break;
            case 4: datestring += 'May'; break;
            case 5: datestring += 'June'; break;
            case 6: datestring += 'July'; break;
            case 7: datestring += 'August'; break;
            case 8: datestring += 'September'; break;
            case 9: datestring += 'October'; break;
            case 10: datestring += 'November'; break;
            case 11: datestring += 'December'; break;
          }
          datestring += ' ' + date.getFullYear().toString();
          if(spent[datestring]) {
            spent[datestring] += parseFloat(val.amount, 10);
          }
          else {
            spent[datestring] = parseFloat(val.amount, 10);
          }
        });
        //then we pass it as data
        for(var money in spent) {
          $scope.eom.data.data.push({
            x: money,
            y: [spent[money]],
            tooltip: money
          });
        }
      });
    } // \controller
  };
});