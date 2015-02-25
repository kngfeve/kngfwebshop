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
      .state('productCatalog', {
        url: '/admin/productCatalog',
        templateUrl: 'app/admin/productCatalog/productCatalog.html',
        controller: 'productCatalogCtrl',
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

