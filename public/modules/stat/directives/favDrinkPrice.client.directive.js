'use strict';

var acData = {
  series: ["Sales"],
  data: [
    {
      x: "Printers",
      y: [60],
      tooltip: "This is a tooltip"
    },
    {
      x: "Computers",
      y: [40],
      tooltip: "This is a tooltip"
    }]
};

var sampleData = [
  {
    name: 'banana',
    quantity: 3,
    price: 1
  },
  {
    name: 'pineapple',
    quantity: 1,
    price: 2
  },
  {
    name: 'watermelon',
    quantity: 1,
    price: 3
  },
  {
    name: 'pineapple',
    quantity: 1,
    price: 2
  }
];


angular.module('stat')
.directive('favDrinkPrice', function() {
  return {
    templateUrl: 'modules/stat/directives/fav-drink-price.html',
    controllerAs: 'fdp',
    controller: function($scope) {

      /*
       * FOR TEST PURPOSES
       */

      $scope.data = sampleData;
      
      this.config = $scope.stat.config;
      this.config.title = 'Chart of the repartition of all the money spent (in €)';
      
      this.data = {
        series: ['Purchases'],
        data: []
      };

      //we oughta calculate how much money was spent in each item
      var funds = {};
      $scope.data.forEach(function(val, ind, arr) {
        if(funds[val.name]) {
          funds[val.name] += val.price * val.quantity;
        }
        else {
          funds[val.name] = val.price * val.quantity;
        }
      });
      //then we pass it as data
      for(var fund in funds) {
        this.data.data.push({
          x: fund,
          y: [funds[fund]],
          tooltip: fund
        });
      }

    } // \controller
  };
});