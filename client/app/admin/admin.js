'use strict';

angular.module('kngfwebshopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'UsersCtrl',
        authenticate: true
      })
      .state('products', {
        url: '/admin/products',
        templateUrl: 'app/admin/products/products.html',
        controller: 'ProductsCtrl',
        authenticate: true,
        resolve: {
          productPromise: ['productFactory', 'shipFactory', function(productFactory, shipFactory){
            console.log('running resolve');
            return productFactory.getProducts() && shipFactory.preLoad();
          }]
        }        
      })
      .state('eve', {
        url: '/admin/eve',
        templateUrl: 'app/admin/eve/eve.html',
        controller: 'EveCtrl',
        authenticate: true
      });      
  });