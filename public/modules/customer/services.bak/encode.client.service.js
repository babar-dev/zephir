'use strict';

angular.module('customer')

.factory('Encode', function Encode () {

  this.sell = function(customer, drink, time){
      return {
        id: 0,
        customerId: customer.id,
        drinkId: drink.id,
        quantity: 1,
        price: drink.price,
        brand: drink.brand,
        name: drink.name,
        date: time
      };
    };

});