'use strict';

angular.module('stat').directive('balanceOverTime', function($q) {
    return {
	templateUrl: 'modules/stat/directives/balance-over-time.html',
	controllerAs: 'bot',
	controller: function($scope) {
	    
	    this.config = $scope.stat.config;
	    this.config.title = 'Chart of the evolution of the balance over time (in €)';
	    
	    this.data = {
		series: ['Balance'],
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
			    number: val.amount ? parseFloat(val.amount, 10) : ( (parseFloat(val.price, 10)) * (parseFloat(val.quantity, 10)*100))};
 		    }) 
		// increase balance for deposit and decrease for purchase
		    .forEach(function(val, ind, arr) {
			console.log('debug');
			console.log('before', balance, val.number);
			if(val.type === 'dep')
			    balance = (balance*100 + val.number*100)/100;
			else {
			    
			    balance = (balance*100 - val.number*100)/100;
			}
			dates[val.datestring] = balance;
			console.log('after', balance);
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
	} // \controller
    };
});
