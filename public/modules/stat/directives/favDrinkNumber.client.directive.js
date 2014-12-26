'use strict';

var sampleData = [
  {
    name: 'banana',
    quantity: 3
  },
  {
    name: 'pineapple',
    quantity: 1
  },
  {
    name: 'watermelon',
    quantity: 1
  }
];


angular.module('stat')
.directive('favDrinkNumber', function() {
  return {
    templateUrl: 'modules/stat/directives/fav-drink-number.html',
    controllerAs: 'fdn',
    controller: function($scope) {

      /*
       * FOR TEST PURPOSES
       */

      $scope.data = sampleData;

      this.config = $scope.stat.config;
      this.config.title = 'Chart of the most purchased items (in number)';
      
      this.data = {
        series: ['Purchases'],
        data: []
      };

      //we oughta calculate the quantity of every purchase
      var quantities = {};
      $scope.data.forEach(function(val, ind, arr) {
        if(quantities[val.name]) {
          quantities[val.name] += val.quantity;
        }
        else {
          quantities[val.name] = val.quantity;
        }
      });
      //then we pass it as data
      for(var quantity in quantities) {
        this.data.data.push({
          x: quantity,
          y: [quantities[quantity]],
          tooltip: quantities[quantity].toString()
        });
      }

    } // \controller
  };
});