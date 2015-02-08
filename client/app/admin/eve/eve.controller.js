'use strict';

angular.module('kngfwebshopApp')
  .controller('EveCtrl', function($scope) {  

    $scope.eveitems = [];
    $scope.name = '641'; 

    var SDD = EVEoj.SDD.Create('json', {'path': 'http://cf.xyjax.com/sdd/109013'});
    SDD.LoadMeta()
      .then(function(arg){
          arg.source.GetTable('invTypes').Load();
          arg.source.GetTable('invGroups').Load();
          arg.source.GetTable('chrRaces').Load();
          arg.source.GetTable('invTypeMaterials').Load();
          $scope.sdd = arg.source;
          console.log($scope.sdd);
      });

    $scope.update = function() {
      //console.log($scope.sdd.GetTable('invTypes'))
      var invTypesTbl = $scope.sdd.GetTable('invTypes');
      var invGroupsTbl = $scope.sdd.GetTable('invGroups');
      var chrRacesTbl = $scope.sdd.GetTable('chrRaces');
      var invTypeMaterialsTbl = $scope.sdd.GetTable('invTypeMaterials');
      console.log(invTypeMaterialsTbl); 

      // invTypes
      var typeID = invTypesTbl.data[$scope.name][invTypesTbl.c.typeID],
          groupID = invTypesTbl.data[$scope.name][invTypesTbl.c.groupID],
          typeName = invTypesTbl.data[$scope.name][invTypesTbl.c.typeName],
          portionSize = invTypesTbl.data[$scope.name][invTypesTbl.c.portionSize],
          raceID = invTypesTbl.data[$scope.name][invTypesTbl.c.raceID],
          marketGroupID = invTypesTbl.data[$scope.name][invTypesTbl.c.marketGroupID];
      
      // invGroups
      var groupName = invGroupsTbl.data[groupID][invGroupsTbl.c.groupName];

      //chrRaces
      var raceName = chrRacesTbl.data[raceID][chrRacesTbl.c.raceName];

      // invTypeMaterials material.materialTypeID
      console.log(_.keys(invTypeMaterialsTbl.data[typeID]).length); 

      var test = {
        typeID: typeID,
        groupID: groupName,
        typeName: typeName,
        portionSize: portionSize,
        raceID: raceName,
        marketGroupID: marketGroupID,
        materials: [],
      };
      console.log(test);

      var i = 0;
      for (var k in invTypeMaterialsTbl.data[typeID]){
         
          if (typeof invTypeMaterialsTbl.data[typeID][k] !== 'function') {
                var materialTypeID = invTypeMaterialsTbl.data[typeID][k][invTypeMaterialsTbl.c.materialTypeID],
                    materialTypeName = invTypesTbl.data[materialTypeID][invTypesTbl.c.typeName],
                    quantity = invTypeMaterialsTbl.data[typeID][k][invTypeMaterialsTbl.c.quantity];
              test.materials[i] = {
                  materialTypeID: materialTypeID,
                  materialTypeName: materialTypeName,
                  quantity: quantity
              };                
          }
          i += 1;
      }




      $scope.eveitems.push(test);   
      console.log($scope.eveitems);
// race id:
// race id [1] = caldari
// race id [2] = minmatar
// race id [4] = amarr
// race id [8] = Gallente
            
    };



  });