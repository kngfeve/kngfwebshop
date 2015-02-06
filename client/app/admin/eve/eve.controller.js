'use strict';

angular.module('kngfwebshopApp')
  .controller('EveCtrl', function($scope, $http, Auth, User, productFactory) {  

    $scope.eveitems = [];
    $scope.name = '641'; 

    var SDD = EVEoj.SDD.Create('json', {'path': 'http://cf.xyjax.com/sdd/109013'});
    SDD.LoadMeta()
      .then(function(arg){
          arg.source.GetTable('eveUnits').Load();
          $scope.sdd = arg.source;
          console.log($scope.sdd)
      });

    $scope.update = function() {
      console.log($scope.sdd.GetTable('invTypes'))
      var tbl = $scope.sdd.GetTable('invTypes');
      console.log(tbl.c); 
          // do something with typeName and typeID
      console.log(tbl.data[$scope.name][tbl.c.typeID]);
      console.log(tbl.data[$scope.name][tbl.c.typeName]);
      console.log(tbl.data[$scope.name][tbl.c.raceID]);
      var typeName = tbl.data[$scope.name][tbl.c.typeName],
          typeID = tbl.data[$scope.name][tbl.c.typeID],
          raceID = tbl.data[$scope.name][tbl.c.raceID];




      $scope.eveitems.push({name: typeName, id: typeID, race: raceID});
// race id:
// race id [1] = caldari
// race id [2] = minmatar
// race id [4] = amarr
// race id [8] = Gallente
            
    };



  });