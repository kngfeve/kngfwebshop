'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  id: String,
  name: String,
  price: { type: Number, min: 0},
  stock: { type: Number, min: 0},
  description: String,
  skillbonus: String,
  rolebonus: String,
  type: String,
  faction: String,
  metalevel: { type: Number, min: 0}   
});

module.exports = mongoose.model('Product', ProductSchema);