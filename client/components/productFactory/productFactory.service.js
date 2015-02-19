'use strict';

angular.module('kngfwebshopApp')
  .factory('productFactory', function ($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var _prodFactory = {
      products: []
    };

    _prodFactory.getProducts = function() {
      console.log('_prodFactory.getProducts');
      return $http.get('/api/products').success(function(data){
        console.log(data);
        angular.copy(data, _prodFactory.products);
      });
    };
    _prodFactory.create = function(data) {
      console.log('_prodFactory.create');
      return $http.post('/api/products', data).success(function(data){
        console.log(data);
      });
    };
    _prodFactory.updateData = function(id, data) {
      console.log('_prodFactory.updateData ' + id);
      return $http.put('/api/products/' + id, data);
    };    

    _prodFactory.deleteData = function(id) {
      console.log('_prodFactory.deleteData ' + id);
      return $http.delete('/api/products/' + id).success(function(data){
        console.log(data);
      });
    };          
    return _prodFactory;
  });






