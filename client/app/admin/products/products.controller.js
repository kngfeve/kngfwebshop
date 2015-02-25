'use strict';

angular.module('kngfwebshopApp')
  .controller('ProductsCtrl', function($scope, $http, Auth, User, productFactory) {
    $scope.saveProduct = function(data, id) {
      console.log(data);
      if(! id){
        productFactory.create(data);
        console.log('-created-');   
      }
      if(id){
        productFactory.updateData(id, data);
        console.log('-updated-');
      }
    };

    // remove Product
    $scope.deleteProduct = function(id){
      productFactory.deleteData(id);
      productFactory.getProducts();
    };  

    // add user
    $scope.export = function(products) {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", JSON.stringify(products));
    };

    $scope.sortReverse = false;
    $scope.editing = false;
    $scope.sortType = 'typeID';
    // Access the factory and get the latest products list


    $scope.products = productFactory.products;  
     


  });
