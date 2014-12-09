'use strict';

angular.module('stat', ['customer'])
.controller('StatController',
            function StatController ($scope, $stateParams, Server, Decode) {

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
                  title: 'Most valuable purchases'
                },
                {
                  name: 'entry-over-month',
                  title: 'Money spent each month'
                },
                {
                  name: 'balance-over-time',
                  title: 'Account balance over time'
                }
                /*,
                 * THAT NEED SOME BACKEND WORK
                 *
                  {
                  name: 'score',
                  title: 'Best drinkers'
                  }
                 */
              ];

              var id = $stateParams.id;

              this.data = {
                purchases: [],
                deposits: []
              };

              var chrono = function (self) {
                return Array.prototype.sort.call(self, function(a, b) {
                   return a.date - b.date;
                });
              };

              Server
              .get('entry', id, 'customer_history')
              .then(function(promised){
                $scope.stat.data.deposits = chrono(promised.data);
              });
              Server
              .get('sell', id, 'customer_history')
              .then(function(promised){
                $scope.stat.data.purchases = chrono(Decode.drinks(promised.data));
              });

	    });