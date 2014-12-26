'use strict';

angular.module('stat')
.directive('drinkHistory', function() {
  return {
    templateUrl: 'modules/stat/directives/drink-history.html',
    controllerAs: 'dh',
    controller: function($scope) {
      $scope.caption = 'History of all the purchases made';
      this.data = [];
      $scope.stat.data.purchases.then(function(promised) {
        // we need to make a copy here not to affect the whole app
        $scope.dh.data = promised.slice(0).reverse();
      });
    }
  };
});