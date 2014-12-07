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
    'ui.select'
])

    .controller('HomeCtrl', function HomeCtrl ($scope, $state) {
	this.debug = function() {
	};
	this.selected = [];
	this.allCustomers = customers;
	this.customers = this.allCustomers.map(function(val, ind, arr){return val.name;});
	
	this.select = function(selected) {
	    $state.go("home.customer", {id:parseInt(selected.id, 10)});
	};

	$scope.state = $state.current.name;
	
    });
