'use strict';

angular.module('kngfwebshopApp')
  .controller('ProductsCtrl', function ($scope, $http, Auth, User) {

    // container for products
    $scope.products = [];

    // Use the User $resource to fetch all users
    $http.get('/api/products').success(function(products) {
      $scope.products = products;
    });

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };





    $scope.sortReverse = false;
    $scope.sortType = 'id';
    // Access the factory and get the latest products list

    $scope.saveProduct = function(data, id) {
      if(! id){
        dataFactory.create(data);
        console.log("-created-");     
      };
      if(id){
        dataFactory.updateData(id, data);
        console.log("-updated-");
      };
    };

    // remove Product
    $scope.deleteProduct = function(id, $index){
      dataFactory.deleteData(id).success(function(data) {
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
      console.log($scope.inserted)
    };
    $scope.types = ['Frigate','Cruiser','Battlecruiser','Battleship']; 
    $scope.factions = ['Gallente','Caldari','Amarr','Minmatar'];     
  });
