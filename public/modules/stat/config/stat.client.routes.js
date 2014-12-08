'use strict';

//Setting up route
angular.module('stat').config(['$stateProvider',
	function($stateProvider) {
		// Stat state routing
		$stateProvider.
		state('stat', {
			url: '/customerstat',
			templateUrl: 'modules/stat/views/stat.client.view.html'
		});
	}
                              ]);