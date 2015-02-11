'use strict';

angular.module('kngfwebshopApp')
  .controller('MainCtrl', function ($scope, $http, $filter) {
// controls the collapsation of the menu    
    $scope.isCollapsed = true;

// array to store products
    $scope.products = [];

// get all products in KNGFs catalog
    $http.get('/api/products').success(function(products) {
      $scope.products = products;
    });

// needed for the sorting filter. see components/productfilter    
    $filter('productfilter');


// add selected product & qty to cart
    $scope.addToCart = function(productID, amount) {
      console.log(productID);
      console.log(amount);
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
