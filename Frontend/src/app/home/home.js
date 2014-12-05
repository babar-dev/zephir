var customers = [
  {
    name: "Batman",
    id: 0
  },
  {
    name: "James (jim) Gordon",
    id: 1
  }
];

angular.module('zephir.home', [
  'zephir.customer',
  'autocomplete'
])

.controller('HomeCtrl', function HomeCtrl ($scope, $state) {
  this.debug = function() {
  };
  this.keyword = "";
  this.allCustomers = customers;
  this.customers = this.allCustomers.map(function(val, ind, arr){return val.name;});
  
  this.select = function(name) {
    //gotta find now which customer it is
    //trick is, we don't have an id, just the name
    var selected;
    customers.forEach(function(val, ind, arr) {
      if(val.name === name){
        selected = val;
      }      
    });
    $state.go("home.customer", {id:parseInt(selected.id, 10)});
  };

});