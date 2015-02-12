'use strict';

angular.module('kngfwebshopApp')
  .controller('NavbarCtrl', function($scope, $location, Auth, cartFactory) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.removeItem = function(id) {
      cartFactory.removeItem(id);
      cartFactory.getData();
      cartFactory.calcTotal();
      console.log('finished')
    };
    $scope.shipCart = cartFactory.cart;
    $scope.total = cartFactory.total;
  });
