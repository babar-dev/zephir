'use strict';

angular.module('stat')
.directive('balanceOverTime', function($q) {
  return {
    templateUrl: 'modules/stat/directives/balance-over-time.html',
    controllerAs: 'bot',
    controller: function($scope) {

      this.config = {
        title: 'Chart of the evolution of the balance over time (in €)',
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
        series: ['Balance'],
        data: []
      };
/*
      $q.all([$scope.stat.data.deposits, $scope.stat.data.purchases]).then(function(promised) {
        console.log(promised);
        var data = promised[0].concat(promised[1]);
        var dates = {};
        data.forEach(function(val, ind, arr) {
          var date = new Date(parseInt(val.date, 10));
          var datestring = "";
          datestring += (date.getDay().toString().length === 1 ? '0' : '') + date.getDay().toString() + '/';
          datestring += (date.getMonth().toString().length === 1 ? '0' : '') + date.getMonth().toString() + '/';
          datestring += date.getFullYear().toString();
          var info;
          if(val.amount) {
            info = parseFloat(val.amount, 10);
          }
          else {
            info = parseFloat(val.price, 10) * parseFloat(val.quantity, 10);
          }
          if(dates[datestring]) {
            dates[datestring] += info;
          }
          else {
            dates[datestring] = info;
          }
        });
        //then we pass it as data
        for(var op in dates) {
          $scope.bot.data.data.push({
            x: op,
            y: [dates[op]],
            tooltip: op
          });
        }
});
*/
    } // \controller
  };
});