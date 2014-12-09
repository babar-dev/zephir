'use strict';

angular.module('stat')
.directive('favDrinkNumber', function() {
  return {
    templateUrl: 'modules/stat/directives/fav-drink-number.html',
    scope: {
      data: '=data'
    },
    controllerAs: 'fdn',
    controller: function($scope, $timeout) {

      this.who = 'world';

      $timeout(function(){
        $scope.chartActive = true;
        
        $scope.dconfig = {
          title: 'Products',
          tooltips: true,
          labels: false,
          mouseover: function() {},
          mouseout: function() {},
          click: function() {},
          legend: {
            display: true,
            //could be 'left, right'
            position: 'right'
          }
        };

        $scope.ddata = {
          series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
          data: [{
            x: 'Laptops',
            y: [100, 500, 0],
            tooltip: 'this is tooltip'
          }, {
            x: 'Desktops',
            y: [300, 100, 100]
          }, {
            x: 'Mobiles',
            y: [351]
          }, {
            x: 'Tablets',
            y: [54, 0, 879]
          }]
        };

      }, 1000);
      this.config = {
        title: 'Chart of the most purchased items',
        tooltips: true,
        labels: true,
        legend: {
          display: true,
          position: 'right'
        },
        innerRadius: 0 // can be a percentage like '50%'
      };

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
        this.data.data = {
          x: quantity,
          y: quantities[quantity]
        };
      }

    } // \controller
  };
});