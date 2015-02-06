'use strict';

angular.module('kngfwebshopApp')
  .controller('MainCtrl', function ($scope, $http, $filter) {

// get all products
    $http.get('/api/products').success(function(products) {
      $scope.products = products;
    });

    $scope.products = [];
    $scope.cart = [];
    $scope.isCollapsed = true;
    $filter('productfilter');




// crud commands, should require admin powers and be located in the admin panel
    $scope.addProduct = function() {
      if($scope.newProduct === '') {
        return;
      }
      $http.post('/api/products', { name: $scope.newProduct });
      $scope.newProduct = '';
    };

    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
    };

// mock categories - move to database once admin panel is done.    
    $scope.categories = [
      {
        'category':'Frigates',
        'subcategories': [
          {
            'subcategory':'Standard Frigate',
            'type':'Frigate',
            'metalevel':'1'
          },
          {
            'subcategory':'Advanced Frigate',
            'type':'Frigate',
            'metalevel':'2'
          }          
        ]
      },
      {
        'category':'Cruisers',
        'subcategories': [
          {
            'subcategory':'Standard Cruiser',
            'type':'Cruiser',
            'metalevel':'1'
          },
          {
            'subcategory':'Advanced Cruiser',
            'type':'Cruiser',
            'metalevel':'2'
          }          
        ]
      },
      {
        'category':'Battle Cruisers',
        'subcategories': [
          {
            'subcategory':'Standard Battlecruiser',
            'type':'Battlecruiser',
            'metalevel':'1'
          },
          {
            'subcategory':'Advanced Battlecruiser',
            'type':'Battlecruiser',
            'metalevel':'2'
          }          
        ]
      }     
    ];    
  });
