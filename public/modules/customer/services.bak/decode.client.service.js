'use strict';

angular.module('customer')

.factory('Decode', function Decode () {

  this.history = function(history){
      return history.map(function(val, ind, arr){
               return {
                 name: val.brand + ' ' + val.name,
                 time: parseInt(val.date, 10),
                 price: val.price
               };
             });
    };


    this.customer = function(customer) {
      var nCustomer = customer;
      nCustomer.name = customer.firstname + ' ('+ customer.nickname + ') ' + customer.lastname;
      return nCustomer;
    };

    this.customers = function(customers) {
      var mut = this.customer;
      return customers.map(function(val, ind, arr){
               mut(val);
               return val;
             });
    };

    this.drink = function(drink) {
      var nDrink = drink;
      nDrink.type = drink.name;
      nDrink.name = drink.brand + ' ' + drink.type;
      nDrink.price = parseFloat(drink.price, 10);
      return nDrink;
    };

    this.drinks = function(drinks) {
      var mut = this.drink;
      return drinks.map(function(val, ind, arr) {
               mut(val);
               return val;
             });
    };



});