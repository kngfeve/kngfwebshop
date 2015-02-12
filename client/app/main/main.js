'use strict';

angular.module('kngfwebshopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
      	resolve: {
  	        cartPromise: ['cartFactory', function(cartFactory){
  	            return cartFactory.getData(), cartFactory.calcTotal(); 
  	        }]
  	    }
      });
  });