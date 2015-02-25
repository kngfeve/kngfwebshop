'use strict';

angular.module('kngfwebshopApp')
  .controller('EveCtrl', function($scope, shipFactory, productFactory) {
    $scope.eveitems = [];
    $scope.sortReverse = false;
    $scope.editing = false;
    $scope.sortType = 'typeID';

    $scope.products = productFactory.products;

    $scope.checkProducts = function(typeID) {
      for (var i = 0; i < $scope.products.length; i++) {
        if ($scope.products[i].typeID === typeID) {
          return true;
        }
      }
      return false;
    };
    //move to some kind of Provider service
    var SDD = EVEoj.SDD.Create('json', {
      'path': 'http://cf.xyjax.com/sdd/109013'
    });
    SDD.LoadMeta().then(function(arg) {
      arg.source.GetTable('invTypes').Load();
      arg.source.GetTable('invGroups').Load();
      arg.source.GetTable('chrRaces').Load();
      arg.source.GetTable('invTypeMaterials').Load();
      arg.source.GetTable('invTypesDesc').Load();
      arg.source.GetTable('invMarketGroups').Load();
      $scope.sdd = arg.source;
      console.log(arg.source.GetTable('invTypes'));
    });

    $scope.update = function(id, sdd) {
      for (var i = 0; i < $scope.products.length; i++) {
        if ($scope.products[i].typeID === id) {
          return;
        }
        console.log(i + ' = ' + $scope.products.length);
        if (i === $scope.products.length -1 && $scope.products[i].typeID !== id) {
          var test = shipFactory.update(id, sdd);
          $scope.eveitems.push(test);
        }
      }
    };
    $scope.saveProduct = function(eveItem, index) {
      // need a check for weather the item already exist on the DB
      productFactory.create(eveItem);
      $scope.products.push(eveItem);
      $scope.eveitems.splice(index, 1);
    };
  });
