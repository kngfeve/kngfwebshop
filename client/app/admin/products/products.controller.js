'use strict';

angular.module('kngfwebshopApp')
  .controller('ProductsCtrl', function($scope, $http, Auth, User, productFactory) {
    productFactory.getProducts().then(function(data) {
      $scope.products = data.data;
    });

    $scope.saveProduct = function(data, id) {
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
      productFactory.deleteData(id).success(function(data) {
          $scope.products.splice($index, 1);
      });
    };  

    // add user
    $scope.addProduct = function() {
       $scope.inserted = {
          id: $scope.id,
          name: $scope.name,
          desc: $scope.desc,
      };
      $scope.products.push($scope.inserted);
      console.log($scope.inserted);
    };

    $scope.sortReverse = false;
    $scope.sortType = 'id';
    // Access the factory and get the latest products list

    $scope.types = ['Frigate','Cruiser','Battlecruiser','Battleship']; 
    $scope.factions = ['Gallente','Caldari','Amarr','Minmatar'];     
  });
