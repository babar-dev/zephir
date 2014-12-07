'use strict';

// Setting up route
angular.module('core', ['ui.select']).config(['$stateProvider', '$urlRouterProvider',
	                       function($stateProvider, $urlRouterProvider) {
		                 // Redirect to home view when route not found
		                 $urlRouterProvider.otherwise('/');

		                 // Home state routing
	                         $stateProvider
                                 .state('home', {
		                     url: '/',
                                     controller: 'HomeController',
                                     controllerAs: 'home',
			             templateUrl: 'modules/core/views/home.client.view.html'
		                   })
                                 .state('home.customer', {
                                     url: 'customer/:id',
                                     controller: 'CustomerController',
                                     controllerAs: 'ctm',
                                     templateUrl: 'modules/customer/views/customer.client.view.html'
                                   });
                               }
                              ]);