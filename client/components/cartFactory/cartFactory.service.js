'use strict';

angular.module('kngfwebshopApp')
  .factory('cartFactory', function ($window) {
    /** https://docs.angularjs.org/guide/providers **/
    var _cartFactory = {
      cart: [],
      total: []
    };

    _cartFactory.getData = function(){
      var json = [];
      $.each($window.sessionStorage, function(i, v){
        json.push(angular.fromJson(v));
      });
      console.log('getting data');
      return angular.copy(json, _cartFactory.cart);
    }; 

    _cartFactory.addToCart = function(id, amount, price){
        var json = {
          id: id,
          amount: amount,
          price: price
        };
        var sessionStorage;
        $.each($window.sessionStorage, function(i){
          sessionStorage = angular.fromJson($window.sessionStorage[i]);          
          if (sessionStorage.id === json.id) {
            console.log('already in sessionStorage. updating amount.');            
            json.amount = json.amount + sessionStorage.amount;
            $window.sessionStorage.setItem(id, angular.toJson(json));
            return console.log('updated' + id);
          }                     
        });
        return $window.sessionStorage.setItem(id, angular.toJson(json));
    };
    
    _cartFactory.removeItem = function(id){
      console.log('attempting to remove ' + id);
      var sessionStorage;
      $.each($window.sessionStorage, function(i){
        sessionStorage = angular.fromJson($window.sessionStorage[i]);
        if (sessionStorage.id === id) {
          console.log(sessionStorage);
          $window.sessionStorage.removeItem(id);
          return console.log('goodbye ' + id);
        }
      });
      return;
    };

    _cartFactory.calcTotal = function(){
      var localTotal = {
          total: null,
        };
      $.each(_cartFactory.cart, function(i){
        var row = _cartFactory.cart[i].price*_cartFactory.cart[i].amount;
        localTotal.total += row;
      });
      return angular.copy(localTotal, _cartFactory.total);
    };       
    return _cartFactory;
  });


