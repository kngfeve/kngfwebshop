'use strict';

angular.module('kngfwebshopApp')
  .controller('EveCtrl', function($scope) {  
    $scope.eveitems = [];
    $scope.name = '641'; 

//move to some kind of Provider service
    var SDD = EVEoj.SDD.Create('json', {'path': 'http://cf.xyjax.com/sdd/109013'});
    SDD.LoadMeta()
      .then(function(arg){
          arg.source.GetTable('invTypes').Load();
          arg.source.GetTable('invGroups').Load();
          arg.source.GetTable('chrRaces').Load();
          arg.source.GetTable('invTypeMaterials').Load();
          arg.source.GetTable('invTypesDesc').Load();
          arg.source.GetTable('invMarketGroups').Load();
          $scope.sdd = arg.source;
          console.log($scope.sdd);
      });

    $scope.update = function() {
      //console.log($scope.sdd.GetTable('invTypes'))
      var invTypesTbl = $scope.sdd.GetTable('invTypes');
      var invGroupsTbl = $scope.sdd.GetTable('invGroups');
      var chrRacesTbl = $scope.sdd.GetTable('chrRaces');
      var invTypeMaterialsTbl = $scope.sdd.GetTable('invTypeMaterials');
      var invTypesDescTbl = $scope.sdd.GetTable('invTypesDesc');
      var invMarketGroupsTbl = $scope.sdd.GetTable('invMarketGroups');
      console.log(invMarketGroupsTbl); 

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

      // invMarketGroups
      var marketGroupParentID = invMarketGroupsTbl.data[marketGroupID][invMarketGroupsTbl.c.parentGroupID];
      var marketGroupParentName = invMarketGroupsTbl.data[marketGroupParentID][invMarketGroupsTbl.c.marketGroupName];
      console.log(marketGroupParentID);
      console.log(marketGroupParentName);

      // invtypesDesc
      var invTypesDesc = invTypesDescTbl.data[$scope.name][invTypesDescTbl.c.description];
      console.log(invTypesDescTbl.data[$scope.name][invTypesDescTbl.c.description]) 

      var test = {
        typeID: typeID,
        groupID: groupName,
        typeName: typeName,
        portionSize: portionSize,
        raceID: raceName,
        marketGroupID: marketGroupParentName,
        invTypesDesc: invTypesDesc,
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
    };
  });