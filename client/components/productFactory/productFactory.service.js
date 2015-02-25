'use strict';

angular.module('kngfwebshopApp')
  .factory('productFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var _prodFactory = {
      products: [],
      categories: []
    };
    _prodFactory.getCategories = function() {
      // loop over every product in DB
      for (var i = 0; i < _prodFactory.products.length; i++) {
        // if the category array is empty, add a catagory.
        if (_prodFactory.categories.length === 0) {
          _prodFactory.categories.push({
            groupID: _prodFactory.products[i]['groupID'],
            marketGroupID: [_prodFactory.products[i]['marketGroupID']]
          });
        };
        // loop over every catagory
        for (var j = 0; j < _prodFactory.categories.length; j++) {
          //if we are at the end of the catagory array, and we still havent found a match, add catagory and subcategory.
          if (_prodFactory.categories[j]['groupID'] === _prodFactory.products[i]['groupID']) {
            for (var k = 0; k < _prodFactory.categories[j]['marketGroupID'].length; k++) {              
              if (_prodFactory.categories[j]['marketGroupID'][k] !== _prodFactory.products[i]['marketGroupID']) {
                _prodFactory.categories[j]['marketGroupID'].push(_prodFactory.products[i]['marketGroupID']);
              };
            };
            break;
          };
          if (_prodFactory.categories[j]['groupID'] != _prodFactory.products[i]['groupID'] && j === _prodFactory.categories.length-1) {
            _prodFactory.categories.push({
              groupID: _prodFactory.products[i]['groupID'],
              marketGroupID: [_prodFactory.products[i]['marketGroupID']]
            });
          };
        };
      };
      return console.log(_prodFactory.categories);
    };
    
    _prodFactory.getProducts = function() {
      return $http.get('/api/products').success(function(data) {
        angular.copy(data, _prodFactory.products);
        console.log(data);
        _prodFactory.getCategories();
      });
    };
    _prodFactory.create = function(data) {
      console.log('_prodFactory.create');
      return $http.post('/api/products', data).success(function(data) {});
    };
    _prodFactory.updateData = function(id, data) {
      return $http.put('/api/products/' + id, data);
    };

    _prodFactory.deleteData = function(id) {
      return $http.delete('/api/products/' + id).success(function(data) {});
    };
    return _prodFactory;
  });
