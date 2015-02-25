'use strict';

angular.module('kngfwebshopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
      	resolve: {
  	        cartPromise: ['cartFactory', 'productFactory', function(cartFactory, productFactory){
  	            return cartFactory.getData(), cartFactory.calcTotal(), productFactory.getProducts(); 
  	        }]
  	    }
      });
  });