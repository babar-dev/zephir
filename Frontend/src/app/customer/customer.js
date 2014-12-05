angular.module('zephir.customer', [])

.controller('CustomerCtrl', function CustomerCtrl() {

  // TODO: load details, balance, status

  this.debug = function() {
    console.log(this.isCompleted);
  };
  
  
  this.customer = {
    name: "James (jim) Gordon",
    firstname: "James",
    lastname: "Gordon",
    nickname: "jim",
    email: "jim@gotham.city",
    password: "batman's coming bitch",
    status: "Chef de bar",
    balance: "42"
  };

  this.isCompleted = false;//this.customer.email !== "" && this.customer.password !== "";

  this.writing = function() {
    console.log("writing");
  };

});
