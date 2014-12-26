'use strict';

angular.module('stat')
.directive('entryOverMonth', function() {
  return {
    templateUrl: 'modules/stat/directives/entry-over-month.html',
    controllerAs: 'eom',
    controller: function($scope) {

      this.config = $scope.stat.config;
      this.caption = 'Chart of the money spent each month (in €)';      
      
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
            tooltip: spent[money].toString()
          });
        }
      });
    } // \controller
  };
});