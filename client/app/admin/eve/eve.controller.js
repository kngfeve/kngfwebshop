'use strict';

angular.module('kngfwebshopApp')
  .controller('EveCtrl', function($scope, shipFactory, productFactory) {  
    $scope.eveitems = [];
    $scope.name = '641'; 

//move to some kind of Provider service
    var SDD = EVEoj.SDD.Create('json', {'path': 'http://cf.xyjax.com/sdd/109013'});
    SDD.LoadMeta().then(function(arg){
      arg.source.GetTable('invTypes').Load();
      arg.source.GetTable('invGroups').Load();
      arg.source.GetTable('chrRaces').Load();
      arg.source.GetTable('invTypeMaterials').Load();
      arg.source.GetTable('invTypesDesc').Load();
      arg.source.GetTable('invMarketGroups').Load();
      $scope.sdd = arg.source;
    }); 

    $scope.update = function(id, sdd) {
      var test = shipFactory.update(id, sdd);
      $scope.eveitems.push(test);
      console.log(test)
    };
    $scope.saveProduct = function(eveItem) {
      // need a check for weather the item already exist on the DB
      console.log(eveItem);
      //productFactory.create(eveItem);
    };        
  });