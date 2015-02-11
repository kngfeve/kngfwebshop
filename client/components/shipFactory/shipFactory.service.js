'use strict';

angular.module('kngfwebshopApp')
  .factory('shipFactory', function () {
    /** https://docs.angularjs.org/guide/providers **/
    var _shipFactory = {};


    _shipFactory.getProducts = function() {
      console.log('_shipFactory.getProducts');













      return $http.get('/api/products'); //return products
    }; // getproducts
       
    return _shipFactory;
  });
