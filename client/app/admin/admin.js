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
        authenticate: true,
        resolve: {
          productPromise: ['productFactory', function(productFactory){
            return productFactory.getProducts();
          }]
        }         
      })
      .state('dashboard', {
        url: '/admin/dashboard',
        templateUrl: 'app/admin/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true     
      });      
  });

