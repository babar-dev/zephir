'use strict';

angular.module('stat').directive('balanceOverTime', function($q) {
  return {
    templateUrl: 'modules/stat/directives/balance-over-time.html',
    controllerAs: 'bot',
    controller: function($scope) {

      $scope.debug = function() {
        console.log($scope.fdn.config);
      };
      
      this.config = $scope.stat.config;
      this.caption = 'Chart of the evolution of the balance over time (in €)';
      
      this.data = {
	series: ['Balance', 'Zero'],
	data: []
      };

      var getDateString = function(time) {
	var date = new Date(parseInt(time, 10));
	var datestring = "";
	datestring += (date.getDate().toString().length === 1 ? '0' : '') + date.getDate().toString() + '/';
	datestring += ((date.getMonth() + 1).toString().length === 1 ? '0' : '') + (date.getMonth() + 1).toString() + '/';
	datestring += date.getFullYear().toString();
	return datestring;
      };
      
      $q.all([$scope.stat.data.deposits, $scope.stat.data.purchases]).then(function(promised) {
        var dates = {};
	var balance = 0;
	// concat deposits and purchases
	promised[0].concat(promised[1])
	// sort them by date
	.sort(function(a, b) {
          return a.date - b.date;
	})
	// update the object for current use
	.map(function(val, ind, arr) {
	  return {
	    datestring: getDateString(val.date),
	    type: val.amount ? 'dep' : 'pur',
	    number: val.amount ? parseFloat(val.amount, 10)*100 : parseFloat(val.price, 10) * parseFloat(val.quantity, 10) * (-100)
          };
 	}) 
	// increase balance for deposit and decrease for purchase
	.forEach(function(val, ind, arr) {
          balance += val.number;
	  dates[val.datestring] = balance/100;
	});

	//then we pass it as data
	for(var op in dates) {
	  $scope.bot.data.data.push({
	    x: op,
	    y: [dates[op], 0],
	    tooltip: dates[op].toString()
	  });
	}
      });
    } // \controller
  };
});
