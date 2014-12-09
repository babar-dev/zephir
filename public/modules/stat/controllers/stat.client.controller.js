'use strict';

angular.module('stat', ['customer'])
.controller('StatController',
            function StatController ($scope, $stateParams, Server, Decode) {

              
              var id = $stateParams.id;

              this.data = {
                purchases: [],
                deposits: []
              };

              var chrono = function (self) {
                return Array.prototype.sort.call(self, function(a, b) {
                   return b.date - a.date;
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