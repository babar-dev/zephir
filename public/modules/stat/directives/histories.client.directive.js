'use strict';

function HistoryController ($scope) {
  this.formatDate = function(time) {
    var d = new Date(parseInt(time, 10));
    var day = d.getDate().toString();
    var month = (d.getMonth() + 1).toString();
    day = day.length === 1 ? '0' + day : day;
    month = month.length === 1 ? '0' + month : month;
    var year = d.getFullYear().toString();
    var date_time = d.getHours().toString() + ':' + d.getMinutes().toString() + ':' + d.getSeconds().toString();
    return day + '/' + month + '/' + year + ' ' + date_time;
  };
  
}

angular.module('stat')
.directive('drinkHistory', function() {
  return {
    templateUrl: 'modules/stat/directives/drink-history.html',
    scope: {
      data: '=data'
    },
    controllerAs: 'dh',
    controller: HistoryController
  };
}).directive('entryHistory', function() {
  return {
    templateUrl: 'modules/stat/directives/entry-history.html',
    scope: {
      data: '=data'
    },
    controllerAs: 'eh',
    controller: HistoryController
  };
});