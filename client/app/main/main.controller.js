'use strict';

angular.module('kngfwebshopApp')
  .controller('MainCtrl', function($scope, $http, $filter, cartFactory, productFactory ) {
// controls the collapsation of the menu    
    $scope.isCollapsed = true;

// array to store products
    $scope.products = productFactory.products;

// needed for the sorting filter. see components/productfilter    
    $filter('productfilter');

// set default input amount in webshop 
    $scope.amount = 1;
// add selected product & qty to cart
    $scope.addToCart = function(productID, amount, price) {
      cartFactory.addToCart(productID, amount, price);
      cartFactory.getData();
      cartFactory.calcTotal();
      console.log('success');
    };

// mock categories - move to database once admin panel is done.    
    $scope.categories = productFactory.categories;    
  });
