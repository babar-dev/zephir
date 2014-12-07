'use strict';

angular.module('customer')
.controller('CustomerController',
            function CustomerController ($rootScope, $scope, $modal, Server, Encode, Decode) {
              
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

              this.isCompleted = this.customer.email !== '' && this.customer.password !== '';

              

              // This allow to complete one's info.
              this.complete = function() {
                var modal = $modal.open({
                  templateUrl: 'modules/customer/views/register.client.view.html',
                  controller: function($scope) {
                    $scope.register = {
                      message: '',
                      email: '',
                      password1: '',
                      password2: '',
                      passwdValidity: function() {
                        return
                      }
                    };
                    $scope.submit = function() {
                      if($scope.register.password1 !== $scope.register.password2 || $scope.register.password1.length < 6) {
                        $scope.form.password1.$setValidity('1validity', false);
                        $scope.form.password2.$setValidity('2validity', false);
                        $scope.register.message = 'The passwords must match and count at least 6 characters.';
                      }
                      else{
                        $scope.form.password1.$setValidity('1validity', true);
                        $scope.form.password2.$setValidity('2validity', true);
                        
                        if(!$scope.form.email.$valid){
                          $scope.register.message = 'Invalid email. Please note that a confirmation will be sent to you.'
                        }
                        else {
                          $scope.$close($scope.register);
                        }
                      }
                    };
                  }
                });
                modal.result.then(function(promised) {
                  var email = promised.email;
                  var password = promised.password1;
                  // TODO: POST
                });
                };



            });