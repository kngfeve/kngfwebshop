'use strict';

angular.module('kngfwebshopApp')
  .controller('MainCtrl', function ($scope, $http, $filter) {
// array to store products
    $scope.products = [];

// get all products in KNGFs catalog
    $http.get('/api/products').success(function(products) {
      $scope.products = products;
      console.log('get products');
      console.log(products);
    });

// array to store products added to cart
    $scope.cart = [];

// add selected product & qty to cart

    $scope.addToCart = function() {

    };




// controls the collapsation of the menu    
    $scope.isCollapsed = true;

// needed for the sorting filter. see components/productfilter    
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
