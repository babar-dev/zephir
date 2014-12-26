'use strict';

angular.module('stat')
.directive('favDrinkNumber', function() {
  return {
    templateUrl: 'modules/stat/directives/fav-drink-number.html',
    controllerAs: 'fdn',
    controller: function($scope) {

      this.config = $scope.stat.config;
      this.caption = 'Chart of the most purchased items (in number)';
      
      this.data = {
        series: ['Purchases'],
        data: []
      };

      $scope.stat.data.purchases.then(function(promised) { 
        //we oughta calculate the quantity of every purchase
        var quantities = {};
        promised.forEach(function(val, ind, arr) {
          if(quantities[val.name]) {
            quantities[val.name] += parseInt(val.quantity, 10);
          }
          else {
            quantities[val.name] = parseInt(val.quantity, 10);
          }
        });
        //then we pass it as data
        for(var quantity in quantities) {
          $scope.fdn.data.data.push({
            x: quantity,
            y: [quantities[quantity]],
            tooltip: quantities[quantity].toString()
          });
        }
      });
    } // \controller
  };
});