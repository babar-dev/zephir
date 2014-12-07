'use strict';

var serverIP = '82.234.73.90';
var serverPort = '10080';
var defToken = 'none';


angular.module('customer')

.factory('Server', function ($rootScope, $state, $q, $http, Encode, Decode){

  function Server () {
    
    //Get current time
    var time = function(){
      var date = new Date();
      return date.getTime();
    };

    this.debug = function(){
      return this.get('customer').then(function(promised){
               return this.value;
             });
    };

    //This prepares and makes all server's requests and returns a promise
    this.request = function(object, params, data){
      var url = 'http://' + serverIP + ':' + serverPort + '/babar/Server/' + object + '.php';
      params.token = defToken;
      var config = {
        'url': url,
        'params':params
      };
      if(data){
        config.data = data;
        config.method = 'POST';
      }else{
        config.method = 'GET';
      }
      return $http(config);
    };

    //This regroups all sorts of gets.
    //id is either the id of a specific object, either 'all'
    //A promise is returned
    this.get = function(object, id, action){
      var promise = null;
      if(id){
        if(action){
          promise = this.request(object, {
            'action': action,
            'id': id
          });
        }else{
          promise = this.request(object, {
            'action': 'info',
            'id': id
          });
        }
      }else{
        promise = this.request(object, {
          'action': 'list'
        });
      }
      return promise;
    };

    //This regroups all sorts of posts
    //A promise is returned
    this.post = function(object, data, action, id) {
      var promise = null;
      if(action) {
        if(id) {
          promise = this.request(object, {
            'action': action,
            'id': id
          }, data);
        }
        else {
          promise = this.request(object, {
            'action': action
          }, data);
        }
      }
      else {
        promise = this.request(object, {
          'action': 'new'
        }, data);
      }
      return promise;
    };


    //A special method for update operations (causes awareness in the code)
    this.update = function(object, data, id) {
      return this.post(object, data, 'update', id);
    };

  }

  return new Server();

});