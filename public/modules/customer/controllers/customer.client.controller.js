'use strict';

angular.module('customer')
.controller('CustomerController',
            function CustomerController ($scope, Server, Encode, Decode) {
              
              // TODO: load details, balance, status
              this.customer = {};
              Server.get('customer', 3).then(function(promised) {
                $scope.ctm.customer = Decode.customer(promised.data);
                Server.get('status', $scope.ctm.customer.statusId).then(function(promised) {
                  switch(promised.data.name) {
                    case 'barkeeper':
                    $scope.ctm.customer.status = 'Chef de Bar';
                    break;
                    case 'barman':
                    $scope.ctm.customer.status = 'Barman';
                    break;
                    case 'VIP':
                    $scope.ctm.customer.status = 'VIP';
                    break;
                    default:
                    $scope.ctm.customer.status = 'Client';
                    break;
                  }
                });
                Server.get('customer', $scope.ctm.customer.id, 'balance').then(function(promised) {
                  $scope.ctm.customer.balance = promised.data.balance;
                });
              });

              this.isCompleted = false;//this.customer.email !== '' && this.customer.password !== '';
/*
              this.complete = function() {
var dialog = ngServer.open({
                  template: 'customer/register.tpl.html',
                  controller: 'RegisterCtrl',
                  controllerAs: 'reg',
                  className: 'ngdialog-theme-plain',
                  showClose: true,
                  closeByDocument: true,
                  closeByEscape: true
                });
                dialog.closePromise.then(function(promised) {
                  console.log(promised);
                });
              };*/
            });