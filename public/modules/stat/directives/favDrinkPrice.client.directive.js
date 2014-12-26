'use strict';

angular.module('stat')
.directive('favDrinkPrice', function() {
  return {
    templateUrl: 'modules/stat/directives/fav-drink-price.html',
    controllerAs: 'fdp',
    controller: function($scope, Decode) {

      this.config = $scope.stat.config;
      this.caption = 'Chart of the repartition of all the money spent (in €)';
      
      this.data = {
        series: ['Purchases'],
        data: []
      };

      $scope.stat.data.purchases.then(function(promised) {
        var funds = {};
        //we oughta calculate how much money was spent in each item
        promised.forEach(function(val, ind, arr) {
          if(funds[val.name]) {
            funds[val.name] += 100 * parseFloat(val.price, 10) * parseFloat(val.quantity, 10);
          }
          else {
            funds[val.name] = 100 * parseFloat(val.price, 10) * parseFloat(val.quantity, 10);
          }
        });
        //console.log(funds);
        //then we pass it as data
        for(var fund in funds) {
          funds[fund] /= 100;
          $scope.fdp.data.data.push({
            x: fund,
            y: [funds[fund]],
            tooltip: funds[fund].toString()
          });
        }
      });
    } // \controller
  };
});