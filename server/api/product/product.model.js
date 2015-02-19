'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  typeID: { type: Number}, // 641
  price: { type: Number, min: 0}, // 10.000 isk
  stock: { type: Number, min: 0}, // 5
  groupID: String, // 5
  invTypesDesc: String, //The Megathron has established...
  marketGroupID: String, //Standard Battleships
  materials: [{
      materialTypeID: { type: Number}, // 34
      materialTypeName: String,// Trit
      quantity: { type: Number}//  1032188
  }],
  portionSize: { type: Number},//1
  raceID: String,//Gallente
  typeName: String  //Megathron
});

module.exports = mongoose.model('Product', ProductSchema);