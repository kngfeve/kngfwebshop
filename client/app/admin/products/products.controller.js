'use strict';

angular.module('kngfwebshopApp')
  .controller('ProductsCtrl', function($scope, $http, Auth, User, productFactory, $timeout) {
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
    $scope.deleteProduct = function(id, $index){
      productFactory.deleteData(id);
      console.log($index);
      productFactory.getProducts();
    };  

    // add user
    $scope.addProduct = function() {
       $scope.inserted = {
          id: $scope.id,
          price: $scope.price,
          stock: $scope.stock,
      };
      $scope.products.push($scope.inserted);
      console.log($scope.inserted);
    };

    $scope.sortReverse = false;
    $scope.editing = false;
    $scope.sortType = 'id';
    // Access the factory and get the latest products list

  
    $scope.products = productFactory.products;  
     


  });
