'use strict';

angular.module('stat')
.directive('drinkHistory', function() {
  return {
    templateUrl: 'modules/stat/directives/drink-history.html',
    controller: DrinkHistory,
    scope: {
      purchases: '=purchases',
      entries: '=entries'
    },
    controllerAs: 'dh'
  }
});

function DrinkHistory () {

  

}