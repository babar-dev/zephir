'use strict';

angular.module('stat', ['customer', 'angularCharts'])
.controller('StatController',
            function StatController ($scope, $stateParams, $q, Server, Decode) {

              
              var id = $stateParams.id;

              this.tabs = [
                {
                  name: 'drink-history',
                  title: 'History of purchases'
                },
                {
                  name: 'entry-history',
                  title: 'History of deposits'
                },
                {
                  name: 'fav-drink-number',
                  title: 'Most recurrent purchases'
                },
                {
                  name: 'fav-drink-price',
                  title: 'Most expensive purchases'
                },
                {
                  name: 'entry-over-month',
                  title: 'Money spent each month'
                },
                {
                  name: 'balance-over-time',
                  title: 'Account balance over time'
                }
              ];
              
              this.active = 'drink-history';
              
              var chrono = function (self) {
                return Array.prototype.sort.call(self, function(a, b) {
                         return a.date - b.date;
                       });
              };

              this.data = {};

              var deferredDeposits = $q.defer();
              var deferredPurchases = $q.defer();

              this.data.deposits = deferredDeposits.promise;
              this.data.purchases = deferredPurchases.promise;
              
              Server
              .get('entry', id, 'customer_history')
              .then(function(promised) {
                deferredDeposits.resolve(chrono(promised.data));
              });
              
              Server
              .get('sell', id, 'customer_history')
              .then(function(promised) {
                deferredPurchases.resolve(chrono(Decode.drinks(promised.data)));
              });

              
	    });