'use strict';

angular.module('kngfwebshopApp')
  .controller('EveCtrl', function($scope, $http, Auth, User, productFactory) {  

    $scope.eveitems = [];
    $scope.name = 'megathron'; 

    var SDD = EVEoj.SDD.Create('json', {'path': 'http://cf.xyjax.com/sdd/109013'});
    SDD.LoadMeta()
      .then(function(arg){
          arg.source.GetTable('invTypes').Load().then(my_load_done_handler);
      });
    function my_load_done_handler(arg) {
      var name = $scope.name,
          rxp = new RegExp('^' + name, 'i'),
          tbl = arg.table,
          results;

      results = _.filter(tbl.data, function(entry) {
          if (rxp.test(entry[tbl.c.typeName])) return true;
          return false;
      });
      _.each(results, function(val, key, list) {
          var typeName = val[tbl.c.typeName],
              typeID = val[tbl.c.typeID];
    
          // do something with typeName and typeID
          $scope.eveitems.push({name: typeName, id: typeID});
          $scope.$apply() 
      });      
    }
  });