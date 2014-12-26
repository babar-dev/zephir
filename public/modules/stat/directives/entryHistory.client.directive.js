'use strict';

angular.module('stat')
.directive('entryHistory', function() {
  return {
    templateUrl: 'modules/stat/directives/entry-history.html',
    controllerAs: 'eh',
    controller: function($scope) {
      $scope.caption = 'History of all the deposits made';
      this.data = [];
      $scope.stat.data.deposits.then(function(promised) {
        // we need to make a copy here not to affect the whole app
        $scope.eh.data = promised.slice(0).reverse();
      });
    }
    };
});