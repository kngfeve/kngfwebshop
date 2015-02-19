/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Product = require('../api/product/product.model');
var User = require('../api/user/user.model');

Product.find({}).remove(function() {
  Product.create(
    {
      typeID: 641,
      price: 15000000,
      stock: 10,
      groupID: "Battleship",
      invTypesDesc: "The Megathron has established itself as one of the most feared and respected battleships around. Since its first appearance almost two decades ago it has seen considerable service in the troublesome regions on the outskirts of the Federation, helping to expand and defend Gallentean influence there.",
      marketGroupID: "Standard Battleships",
      materials: [{
        materialTypeID: 34, // 34
        materialTypeName: "Tritanium",// Trit
        quantity: 10321889//  1032188
      },{
        materialTypeID: 35, // 34
        materialTypeName: "Pyerite",// Trit
        quantity: 2637000//  1032188
      },{
        materialTypeID: 36, // 34
        materialTypeName: "Mexallon",// Trit
        quantity: 646889//  1032188
      },{
        materialTypeID: 37, // 34
        materialTypeName: "Isogen",// Trit
        quantity: 161433//  1032188
      },{
        materialTypeID: 38, // 34
        materialTypeName: "Nocxium",// Trit
        quantity: 40300//  1032188
      },{
        materialTypeID: 39, // 34
        materialTypeName: "Zydrine",// Trit
        quantity: 9556//  1032188
      },{
        materialTypeID: 40, // 34
        materialTypeName: "Megacyte",// Trit
        quantity: 2933//  1032188
      }],
      portionSize: 1,
      raceID: "Gallente",
      typeName: "Megathron"      
    }

  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});