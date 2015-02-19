'use strict';

angular.module('kngfwebshopApp')
  .factory('shipFactory', function ($timeout, productFactory) {
    /** https://docs.angularjs.org/guide/providers **/
    var _shipFactory = {
    	products: [],
      source: {}
    };


    _shipFactory.preLoad = function() {
      var SDD = EVEoj.SDD.Create('json', {'path': 'http://cf.xyjax.com/sdd/109013'});
      return SDD.LoadMeta().then(function(arg){
        arg.source.GetTable('invTypes').Load();
          console.log(arg.source.tables.invTypes)
          angular.extend(_shipFactory.source, arg.source);
      });
    };

		_shipFactory.getProducts = function(objectArray) {
      _shipFactory.source.tables.invTypes.Load()
      var invTypesTbl = _shipFactory.source.tables.invTypes;
      console.log(_shipFactory.source.tables.invTypes.data[0]);
      // invTypes
      $timeout( function() {
        for (var i = 0; i < objectArray.length; i++) {
          console.log('loop:' + i)
          var objectId = objectArray[i]['id'];
          console.log('objectId: ' + objectId)
          objectArray[i][name] = _shipFactory.source.tables.invTypes.data[605][2];
        };
      }, 100)       

      return objectArray;             
    };

		_shipFactory.update = function(name, sdd) {
      console.log(sdd.GetTable('invTypes'))
      var invTypesTbl = sdd.GetTable('invTypes');
      var invGroupsTbl = sdd.GetTable('invGroups');
      var chrRacesTbl = sdd.GetTable('chrRaces');
      var invTypeMaterialsTbl = sdd.GetTable('invTypeMaterials');
      var invTypesDescTbl = sdd.GetTable('invTypesDesc');
      var invMarketGroupsTbl = sdd.GetTable('invMarketGroups');

      // invTypes
      var typeID = invTypesTbl.data[name][invTypesTbl.c.typeID],
          groupID = invTypesTbl.data[name][invTypesTbl.c.groupID],
          typeName = invTypesTbl.data[name][invTypesTbl.c.typeName],
          portionSize = invTypesTbl.data[name][invTypesTbl.c.portionSize],
          raceID = invTypesTbl.data[name][invTypesTbl.c.raceID],
          marketGroupID = invTypesTbl.data[name][invTypesTbl.c.marketGroupID];
      
      // invGroups
      var groupName = invGroupsTbl.data[groupID][invGroupsTbl.c.groupName];

      //chrRaces
      var raceName = chrRacesTbl.data[raceID][chrRacesTbl.c.raceName];

      // invMarketGroups
      var marketGroupParentID = invMarketGroupsTbl.data[marketGroupID][invMarketGroupsTbl.c.parentGroupID];
      var marketGroupParentName = invMarketGroupsTbl.data[marketGroupParentID][invMarketGroupsTbl.c.marketGroupName];

      // invtypesDesc
      var invTypesDesc = invTypesDescTbl.data[name][invTypesDescTbl.c.description];

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
      return test;             
    };

    return _shipFactory;
  });

    